import { afterEach, describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchModal from "./SearchModal";
import { searchProducts, countSearchProducts } from "../queries/searchProducts";
import type { SearchedProducts } from "../queries/searchProducts";

// Server Actionをモックする
vi.mock("../queries/searchProducts", () => ({
  searchProducts: vi.fn(),
  countSearchProducts: vi.fn(),
}));

// Promiseの完了タイミングを制御する
function createDeferred<T>() {
  let resolve!: (value: T) => void;

  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

function createMockProduct(
  overrides: Partial<SearchedProducts[number]> = {},
): SearchedProducts[number] {
  return {
    id: "test-id",
    user_id: "test-user",
    name: "Test Product",
    slug: "test-product",
    url: "https://example.com",
    category_id: "category-1",
    tagline: "Test tagline",
    description: "Test description",
    features: null,
    thumbnail_url: "",
    pricing_type: "Free",
    status: "published",
    upvotes_count: 0,
    comments_count: 0,
    view_count: BigInt(0),
    created_at: new Date(),
    updated_at: new Date(),
    categories: {
      id: "category-1",
      name: "AIツール",
      slug: "ai-tools",
      created_at: new Date(),
    },
    ...overrides,
  };
}

describe("SearchModal", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test("古い検索結果が新しい検索結果を上書きしない", async () => {
    // Arrange
    vi.useFakeTimers();

    const oldRequest = createDeferred<SearchedProducts>();
    const newRequest = createDeferred<SearchedProducts>();

    vi.mocked(searchProducts)
      .mockReturnValueOnce(oldRequest.promise)
      .mockReturnValueOnce(newRequest.promise);

    vi.mocked(countSearchProducts).mockResolvedValue(1);

    const onSearchModalClose = vi.fn();

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    const input = screen.getByRole("searchbox");

    // Act ① 古い検索を開始する
    fireEvent.change(input, {
      target: { value: "a" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    // Act ② 新しい検索を開始する
    fireEvent.change(input, {
      target: { value: "api" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledTimes(2);
    expect(searchProducts).toHaveBeenNthCalledWith(1, {
      keyword: "a",
      categories: [],
    });

    expect(searchProducts).toHaveBeenNthCalledWith(2, {
      keyword: "api",
      categories: [],
    });

    // Act ③ 新しい検索を先に完了させる
    const newProducts: SearchedProducts = [
      createMockProduct({
        id: "new",
        name: "API Product",
        slug: "api-product",
      }),
    ];

    await act(async () => {
      newRequest.resolve(newProducts);
      await newRequest.promise;
    });

    expect(screen.getByText("API Product")).toBeInTheDocument();

    // Act ④ 古い検索を後から完了させる
    const oldProducts: SearchedProducts = [
      createMockProduct({
        id: "old",
        name: "Another Product",
        slug: "another-product",
      }),
    ];

    await act(async () => {
      oldRequest.resolve(oldProducts);
      await oldRequest.promise;
    });

    expect(screen.getByText("API Product")).toBeInTheDocument();
    expect(screen.queryByText("Another Product")).not.toBeInTheDocument();
  });

  test("キーワード検索中にカテゴリを変更しても古い検索結果が上書きしない", async () => {
    // Arrange
    vi.useFakeTimers();

    const oldRequest = createDeferred<SearchedProducts>();
    const newRequest = createDeferred<SearchedProducts>();

    vi.mocked(searchProducts)
      .mockReturnValueOnce(oldRequest.promise)
      .mockReturnValueOnce(newRequest.promise);

    vi.mocked(countSearchProducts).mockResolvedValue(1);

    const onSearchModalClose = vi.fn();

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    const input = screen.getByRole("searchbox");
    const checkbox = screen.getByRole("checkbox", {
      name: "AIツール",
    });

    // Act ① 古いキーワード検索を開始する
    fireEvent.change(input, {
      target: { value: "a" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    // Act ② 新しいカテゴリ検索を開始する
    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledTimes(2);
    expect(searchProducts).toHaveBeenNthCalledWith(1, {
      keyword: "a",
      categories: [],
    });

    expect(searchProducts).toHaveBeenNthCalledWith(2, {
      keyword: "a",
      categories: ["AIツール"],
    });

    // Act ③ 新しいカテゴリ検索を先に完了させる
    const newProducts: SearchedProducts = [
      createMockProduct({
        id: "new",
        name: "API Product",
        slug: "api-product",
      }),
    ];

    await act(async () => {
      newRequest.resolve(newProducts);
      await newRequest.promise;
    });

    expect(screen.getByText("API Product")).toBeInTheDocument();

    // Act ④ 古いキーワード検索を後から完了させる
    const oldProducts: SearchedProducts = [
      createMockProduct({
        id: "old",
        name: "Another Product",
        slug: "another-product",
        categories: {
          id: "category-1",
          name: "SaaS",
          slug: "saas",
          created_at: new Date(),
        },
      }),
    ];

    await act(async () => {
      oldRequest.resolve(oldProducts);
      await oldRequest.promise;
    });

    expect(screen.getByText("API Product")).toBeInTheDocument();
    expect(screen.queryByText("Another Product")).not.toBeInTheDocument();
  });

  test("キーワード未入力でも一つのカテゴリのみで検索できる", async () => {
    // Arrange
    vi.useFakeTimers();

    const onSearchModalClose = vi.fn();

    const products: SearchedProducts = [
      createMockProduct({
        name: "WriteMate",
        slug: "write-mate",
      }),
    ];

    vi.mocked(searchProducts).mockResolvedValue(products);
    vi.mocked(countSearchProducts).mockResolvedValue(1);

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "AIツール",
    });

    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledWith({
      keyword: "",
      categories: ["AIツール"],
    });

    expect(screen.getByText("WriteMate")).toBeInTheDocument();
  });

  test("キーワード未入力でも複数のカテゴリの検索で検索できる", async () => {
    // Arrange
    vi.useFakeTimers();

    const products: SearchedProducts = [
      createMockProduct({
        id: "ai-1",
        name: "AI Product",
      }),
      createMockProduct({
        id: "saas-1",
        name: "SaaS Product",
        categories: {
          id: "category-2",
          name: "SaaS",
          slug: "saas",
          created_at: new Date(),
        },
      }),
    ];

    vi.mocked(searchProducts).mockResolvedValue(products);
    vi.mocked(countSearchProducts).mockResolvedValue(2);

    const onSearchModalClose = vi.fn();

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    const checkboxAI = screen.getByRole("checkbox", {
      name: "AIツール",
    });
    const checkboxSaaS = screen.getByRole("checkbox", {
      name: "SaaS",
    });

    fireEvent.click(checkboxAI);
    fireEvent.click(checkboxSaaS);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledWith({
      keyword: "",
      categories: ["AIツール", "SaaS"],
    });
    expect(screen.getByText("AI Product")).toBeInTheDocument();
    expect(screen.getByText("SaaS Product")).toBeInTheDocument();
  });

  test("未選択時に検索結果が表示されない", async () => {
    // Arrange
    vi.useFakeTimers();

    const onSearchModalClose = vi.fn();

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    expect(searchProducts).not.toHaveBeenCalled();
    expect(countSearchProducts).not.toHaveBeenCalled();
  });

  test("選択解除時に検索結果が表示されない", async () => {
    // Arrange
    vi.useFakeTimers();

    const products: SearchedProducts = [
      createMockProduct({
        name: "AI Product",
      }),
    ];

    vi.mocked(searchProducts).mockResolvedValue(products);
    vi.mocked(countSearchProducts).mockResolvedValue(1);

    const onSearchModalClose = vi.fn();

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "AIツール",
    });

    // Act
    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    // Assert
    expect(searchProducts).toHaveBeenCalledWith({
      keyword: "",
      categories: ["AIツール"],
    });

    expect(screen.getByText("AI Product")).toBeInTheDocument();

    // Act
    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(screen.queryByText("AI Product")).not.toBeInTheDocument();
    expect(searchProducts).toHaveBeenCalledTimes(1);
    expect(countSearchProducts).toHaveBeenCalledTimes(1);
  });
});

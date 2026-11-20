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
    pricing_type: "Freemium",
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
      pricing_type: [],
      order: "popular",
    });

    expect(searchProducts).toHaveBeenNthCalledWith(2, {
      keyword: "api",
      categories: [],
      pricing_type: [],
      order: "popular",
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
      pricing_type: [],
      order: "popular",
    });

    expect(searchProducts).toHaveBeenNthCalledWith(2, {
      keyword: "a",
      categories: ["AIツール"],
      pricing_type: [],
      order: "popular",
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

  test("キーワード検索中に料金プランを変更しても古い検索結果が上書きしない", async () => {
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
      name: "Freemium",
    });

    // Act ① 古いキーワード検索を開始する
    fireEvent.change(input, {
      target: { value: "b" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    // Act ② 新しい料金プラン検索を開始する
    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledTimes(2);
    expect(searchProducts).toHaveBeenNthCalledWith(1, {
      keyword: "b",
      categories: [],
      pricing_type: [],
      order: "popular",
    });

    expect(searchProducts).toHaveBeenNthCalledWith(2, {
      keyword: "b",
      categories: [],
      pricing_type: ["Freemium"],
      order: "popular",
    });

    // Act ③ 新しいカテゴリ検索を先に完了させる
    const newProducts: SearchedProducts = [
      createMockProduct({
        id: "new",
        name: "PromptBox",
        slug: "prompt-box",
      }),
    ];

    await act(async () => {
      newRequest.resolve(newProducts);
      await newRequest.promise;
    });

    expect(screen.getByText("PromptBox")).toBeInTheDocument();

    // Act ④ 古いキーワード検索を後から完了させる
    const oldProducts: SearchedProducts = [
      createMockProduct({
        id: "old",
        name: "HabitBoard",
        slug: "habit-board",
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

    expect(screen.getByText("PromptBox")).toBeInTheDocument();
    expect(screen.queryByText("HabitBoard")).not.toBeInTheDocument();
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
      pricing_type: [],
      order: "popular",
    });

    expect(screen.getByText("WriteMate")).toBeInTheDocument();
  });

  test("キーワード未入力でも複数のカテゴリの検索で検索できる", async () => {
    // Arrange
    vi.useFakeTimers();

    const products: SearchedProducts = [
      createMockProduct({
        id: "prompt-box",
        name: "PromptBox",
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
      pricing_type: [],
      order: "popular",
    });
    expect(screen.getByText("PromptBox")).toBeInTheDocument();
    expect(screen.getByText("SaaS Product")).toBeInTheDocument();
  });

  test("キーワード未入力でも一つの料金プランのみで検索できる", async () => {
    // Arrange
    vi.useFakeTimers();

    const onSearchModalClose = vi.fn();

    const products: SearchedProducts = [
      createMockProduct({
        name: "API Monitor",
        slug: "api-monitor",
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
      name: "Paid",
    });

    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledWith({
      keyword: "",
      categories: [],
      pricing_type: ["Paid"],
      order: "popular",
    });

    expect(screen.getByText("API Monitor")).toBeInTheDocument();
  });

  test("キーワード未入力でも複数の料金プランの検索で検索できる", async () => {
    // Arrange
    vi.useFakeTimers();

    const products: SearchedProducts = [
      createMockProduct({
        id: "focus-flow",
        name: "FocusFlow",
      }),
      createMockProduct({
        id: "habit-board",
        name: "HabitBoard",
      }),
      createMockProduct({
        id: "write-mate",
        name: "WriteMate",
      }),
      createMockProduct({
        id: "write-mate-2",
        name: "WriteMate",
      }),
      createMockProduct({
        id: "api-monitor",
        name: "API Monitor",
      }),
    ];

    vi.mocked(searchProducts).mockResolvedValue(products);
    vi.mocked(countSearchProducts).mockResolvedValue(5);

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
      name: "Free",
    });
    const checkboxSaaS = screen.getByRole("checkbox", {
      name: "Paid",
    });

    fireEvent.click(checkboxAI);
    fireEvent.click(checkboxSaaS);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledWith({
      keyword: "",
      categories: [],
      pricing_type: ["Free", "Paid"],
      order: "popular",
    });

    expect(screen.getByText("FocusFlow")).toBeInTheDocument();
    expect(screen.getByText("HabitBoard")).toBeInTheDocument();
    expect(screen.getAllByText("WriteMate")).toHaveLength(2);
    expect(screen.getByText("API Monitor")).toBeInTheDocument();
    expect(screen.getByText("5件")).toBeInTheDocument();
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
        name: "PromptBox",
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
      pricing_type: [],
      order: "popular",
    });

    expect(screen.getByText("PromptBox")).toBeInTheDocument();

    // Act
    fireEvent.click(checkbox);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(screen.queryByText("PromptBox")).not.toBeInTheDocument();
    expect(searchProducts).toHaveBeenCalledTimes(1);
    expect(countSearchProducts).toHaveBeenCalledTimes(1);
  });

  test("キーワード＋複数カテゴリ＋料金プランの検索ができて結果が表示される", async () => {
    // Arrange
    vi.useFakeTimers();

    const products: SearchedProducts = [
      createMockProduct({
        id: "api-monitor",
        name: "API Monitor",
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

    const input = screen.getByRole("searchbox");
    const checkboxCategory = screen.getByRole("checkbox", {
      name: "Developer Tools",
    });
    const checkboxPricing = screen.getByRole("checkbox", {
      name: "Paid",
    });

    fireEvent.change(input, {
      target: { value: "a" },
    });
    fireEvent.click(checkboxCategory);
    fireEvent.click(checkboxPricing);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledWith({
      keyword: "a",
      categories: ["Developer Tools"],
      pricing_type: ["Paid"],
      order: "popular",
    });

    expect(screen.getByText("API Monitor")).toBeInTheDocument();
    expect(screen.getByText("1件")).toBeInTheDocument();
  });

  test("検索失敗時のエラー・ローディング終了テスト", async () => {
    // Arrange
    vi.useFakeTimers();

    vi.mocked(searchProducts).mockRejectedValue(
      new Error("プロダクトの検索中にエラーが発生しました"),
    );

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

    fireEvent.change(input, {
      target: { value: "a" },
    });

    expect(screen.getByTestId("search-spinner")).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(
      screen.getByText("プロダクトの検索中にエラーが発生しました"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("search-spinner")).not.toBeInTheDocument();
  });

  test("検索ワードを入力してから並び順を新着順にすると、新着順に並び変わり、さらに", async () => {
    // Arrange
    vi.useFakeTimers();

    const onSearchModalClose = vi.fn();

    const products: SearchedProducts = [
      createMockProduct({
        name: "Product A",
        upvotes_count: 100,
        created_at: new Date("2026-01-01"),
      }),
      createMockProduct({
        name: "Product B",
        upvotes_count: 10,
        created_at: new Date("2030-01-01"),
      }),
    ];

    vi.mocked(searchProducts).mockImplementation(async (params) => {
      if (params.order === "newest") {
        return [products[1], products[0]];
      }

      return [products[0], products[1]];
    });

    vi.mocked(countSearchProducts).mockResolvedValue(2);

    render(
      <SearchModal
        isSearchModalOpen={true}
        onSearchModalClose={onSearchModalClose}
        votedProductIds={new Set<string>()}
        user={null}
      />,
    );

    const input = screen.getByRole("searchbox");
    const sortSelect = screen.getByRole("combobox", {
      name: "並び順",
    });

    fireEvent.change(input, {
      target: { value: "p" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const productNames = screen.getAllByRole("heading", { level: 3 });

    expect(productNames.map((el) => el.textContent)).toEqual([
      "Product A",
      "Product B",
    ]);

    expect(searchProducts).toHaveBeenLastCalledWith({
      keyword: "p",
      categories: [],
      pricing_type: [],
      order: "popular",
    });

    fireEvent.change(sortSelect, {
      target: { value: "newest" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const updatedProductNames = screen.getAllByRole("heading", {
      level: 3,
    });

    expect(updatedProductNames.map((el) => el.textContent)).toEqual([
      "Product B",
      "Product A",
    ]);

    expect(searchProducts).toHaveBeenLastCalledWith({
      keyword: "p",
      categories: [],
      pricing_type: [],
      order: "newest",
    });
  });

  test("未選択時に新着順に変えても検索されない", async () => {
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

    const sortSelect = screen.getByRole("combobox", {
      name: "並び順",
    });

    fireEvent.change(sortSelect, {
      target: { value: "newest" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).not.toHaveBeenCalled();
  });
});

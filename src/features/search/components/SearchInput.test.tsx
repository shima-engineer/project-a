import { afterEach, describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { searchProducts } from "../queries/searchProducts";
import type { SearchedProducts } from "../queries/searchProducts";

// Server Actionをモックする
vi.mock("../queries/searchProducts", () => ({
  searchProducts: vi.fn(),
}));

// Promiseの完了タイミングを制御する
function createDeferred<T>() {
  let resolve!: (value: T) => void;

  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

describe("SearchInput", () => {
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

    const handleSearchResultsChange = vi.fn();
    const handleCountSearchProducts = vi.fn();
    const setIsLoading = vi.fn();
    const setKeyword = vi.fn();
    const setIsError = vi.fn();

    render(
      <SearchInput
        handleSearchResultsChange={handleSearchResultsChange}
        handleCountSearchProducts={handleCountSearchProducts}
        setIsLoading={setIsLoading}
        setKeyword={setKeyword}
        setIsError={setIsError}
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

    expect(searchProducts).toHaveBeenCalledWith("a");

    // Act ② 新しい検索を開始する
    fireEvent.change(input, {
      target: { value: "api" },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(searchProducts).toHaveBeenCalledWith("api");

    // Act ③ 新しい検索を先に完了させる
    const newProducts = [
      { id: "new", name: "API Product" },
    ] as SearchedProducts;

    await act(async () => {
      newRequest.resolve(newProducts);
      await newRequest.promise;
    });

    expect(handleSearchResultsChange).toHaveBeenCalledWith(newProducts);

    // 古い検索完了前の呼び出し数を記録
    const callCount = handleSearchResultsChange.mock.calls.length;

    // Act ④ 古い検索を後から完了させる
    const oldProducts = [
      { id: "old", name: "Another Product" },
    ] as SearchedProducts;

    await act(async () => {
      oldRequest.resolve(oldProducts);
      await oldRequest.promise;
    });

    // Assert
    // 古い検索結果が追加で反映されていない
    expect(handleSearchResultsChange).toHaveBeenCalledTimes(callCount);

    // 最新の検索結果が維持されている
    expect(handleSearchResultsChange).toHaveBeenLastCalledWith(newProducts);

    // 古い検索によって件数取得も実行されていない
    expect(handleCountSearchProducts).toHaveBeenCalledTimes(1);

    // 古い検索によってローディング状態が変更されていない
    expect(setIsLoading).toHaveBeenLastCalledWith(false);
    expect(setIsLoading).toHaveBeenCalledTimes(3);
  });
});

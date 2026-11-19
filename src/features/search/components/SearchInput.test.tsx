import { afterEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";

// Server Actionをモックする
vi.mock("../queries/searchProducts", () => ({
  searchProducts: vi.fn(),
}));

describe("SearchInput", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test("キーワード変更時にonKeywordChangeが呼ばれる", () => {
    const onKeywordChange = vi.fn();

    render(<SearchInput onKeywordChange={onKeywordChange} />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "api" },
    });

    expect(onKeywordChange).toHaveBeenCalledWith("api");
  });
});

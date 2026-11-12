import { describe, test, expect, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    products: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";
import { searchProducts, countSearchProducts } from "./searchProducts";

describe("検索キーワードの最大文字数", () => {
  test("101文字の場合は検索せずに空配列を返す", async () => {
    // Arrange
    const keyword = "a".repeat(101);

    // Act
    const products = await searchProducts(keyword);

    // Assert
    expect(products).toEqual([]);
    expect(prisma.products.findMany).not.toHaveBeenCalled();
  });

  test("101文字の場合は件数取得せずに0を返す", async () => {
    // Arrange
    const keyword = "a".repeat(101);

    // Act
    const count = await countSearchProducts(keyword);

    // Assert
    expect(count).toBe(0);
    expect(prisma.products.count).not.toHaveBeenCalled();
  });
});

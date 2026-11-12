import { describe, test, expect } from "vitest";
import { searchProducts } from "./searchProducts";

describe("searchProducts 結合テスト", () => {
  test("単一キーワードに一致するプロダクトを取得できる", async () => {
    // Arrange
    const keyword = "api";

    // Act
    const products = await searchProducts(keyword);

    // Assert
    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => {
      expect(product.name.toLowerCase()).toContain(keyword.toLowerCase());
    });
  });

  test("複数キーワードのAND検索ができる", async () => {
    // Arrange
    const keyword = "a p";
    const keywords = keyword.split(/\s+/);

    // Act
    const products = await searchProducts(keyword);

    // Assert
    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => {
      keywords.forEach((word) => {
        expect(product.name.toLowerCase()).toContain(word.toLowerCase());
      });
    });
  });
});

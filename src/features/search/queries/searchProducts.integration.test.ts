import { describe, test, expect } from "vitest";
import { searchProducts, countSearchProducts } from "./searchProducts";

describe("searchProducts 結合テスト", () => {
  test("単一キーワードに一致するプロダクトを取得できる", async () => {
    // Arrange
    const keyword = "api";
    const categories: string[] = [];
    const pricing_type: string[] = [];
    const params = { keyword, categories, pricing_type };

    // Act
    const products = await searchProducts(params);

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
    const categories: string[] = [];
    const pricing_type: string[] = [];
    const params = { keyword, categories, pricing_type };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => {
      keywords.forEach((word) => {
        expect(product.name.toLowerCase()).toContain(word.toLowerCase());
      });
    });
  });

  test("単一料金プランに一致するプロダクトを取得できる", async () => {
    // Arrange
    const keyword = "";
    const categories: string[] = [];
    const pricing_type: string[] = ["Paid"];
    const params = { keyword, categories, pricing_type };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => {
      expect(product.pricing_type).toBe(pricing_type[0]);
    });
  });

  test("複数料金プランに一致するプロダクトを取得できる", async () => {
    // Arrange
    const keyword = "";
    const categories: string[] = [];
    const pricing_type: string[] = ["Free", "Paid"];
    const params = { keyword, categories, pricing_type };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products.length).toBeGreaterThan(0);

    const returnedPricingTypes = products.map(
      (product) => product.pricing_type,
    );

    expect(returnedPricingTypes).toContain("Free");
    expect(returnedPricingTypes).toContain("Paid");

    products.forEach((product) => {
      expect(pricing_type).toContain(product.pricing_type);
    });
  });

  test("キーワード＋カテゴリ＋料金プランの検索で、条件に一致するプロダクトを取得できる", async () => {
    // Arrange
    const keyword = "a";
    const categories: string[] = ["Developer Tools"];
    const pricing_type: string[] = ["Paid"];
    const params = { keyword, categories, pricing_type };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => {
      expect(product.name.toLowerCase()).toContain(keyword.toLowerCase());
      expect(categories[0]).toBe(product.categories.name);
      expect(pricing_type[0]).toBe(product.pricing_type);
    });
  });
});

describe("検索結果", () => {
  test("6件以上一致する場合でも最大5件取得する", async () => {
    // Arrange
    const keyword = "プ";
    const categories: string[] = [];
    const pricing_type: string[] = [];
    const params = { keyword, categories, pricing_type };

    // Act
    const totalCount = await countSearchProducts(params);
    const products = await searchProducts(params);

    // Assert
    expect(totalCount).toBeGreaterThanOrEqual(6);
    expect(products).toHaveLength(5);
  });

  test("料金プランで検索して、条件に一致するプロダクトの件数が取得できる", async () => {
    // Arrange
    const keyword = "";
    const categories: string[] = [];
    const pricing_type: string[] = ["Free"];
    const params = { keyword, categories, pricing_type };

    // Act
    const totalCount = await countSearchProducts(params);
    const products = await searchProducts(params);

    // Assert
    expect(totalCount).toBe(4);
    expect(products).toHaveLength(4);
  });
});

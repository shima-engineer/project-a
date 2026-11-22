import { describe, test, expect } from "vitest";
import { searchProducts, countSearchProducts } from "./searchProducts";

describe("searchProducts 結合テスト", () => {
  test("単一キーワードに一致するプロダクトを取得できる", async () => {
    // Arrange
    const keyword = "api";
    const categories: string[] = [];
    const pricing_type: string[] = [];
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

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
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

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
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

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
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

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
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

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
    const keyword = "";
    const categories: string[] = [
      "AIツール",
      "SaaS",
      "Webアプリ",
      "ネイティブアプリ",
      "Developer Tools",
      "生産性",
      "デザイン",
      "マーケティング",
    ];
    const pricing_type: string[] = [];
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

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
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

    // Act
    const totalCount = await countSearchProducts(params);
    const products = await searchProducts(params);

    // Assert
    expect(totalCount).toBe(3);
    expect(products).toHaveLength(3);
  });

  test("検索ワードを入力してから並び順を新着順にすると、新着順に並び変わる", async () => {
    // Arrange
    const keyword = "a";
    const categories: string[] = [];
    const pricing_type: string[] = [];
    const order = "popular";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

    // Act
    const products = await searchProducts(params);

    // Assert
    for (let i = 0; i < products.length - 1; i++) {
      expect(products[i].upvotes_count).toBeGreaterThanOrEqual(
        products[i + 1].upvotes_count,
      );
    }

    // Act
    // 新着順で検索
    const newestProducts = await searchProducts({
      ...params,
      order: "newest",
    });

    // Assert
    for (let i = 0; i < newestProducts.length - 1; i++) {
      expect(newestProducts[i].created_at.getTime()).toBeGreaterThanOrEqual(
        newestProducts[i + 1].created_at.getTime(),
      );
    }
  });

  test("未選択時に新着順に変えても検索されない", async () => {
    // Arrange
    const keyword = "";
    const categories: string[] = [];
    const pricing_type: string[] = [];
    const order = "newest";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products).toEqual([]);
  });

  test("takeAllがtrueの場合、6件目以降も取得できる", async () => {
    // Arrange
    const keyword = "";
    const categories: string[] = ["AIツール", "SaaS", "Webアプリ"];
    const pricing_type: string[] = [];
    const order = "newest";
    const takeAll = true;
    const params = { keyword, categories, pricing_type, order, takeAll };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products.length).toBeGreaterThan(6);
  });

  test("takeAllがfalseの場合、6件目以降は取得できない", async () => {
    // Arrange
    const keyword = "";
    const categories: string[] = ["AIツール", "SaaS", "Webアプリ"];
    const pricing_type: string[] = [];
    const order = "newest";
    const takeAll = false;
    const params = { keyword, categories, pricing_type, order, takeAll };

    // Act
    const products = await searchProducts(params);

    // Assert
    expect(products).toHaveLength(5);
  });
});

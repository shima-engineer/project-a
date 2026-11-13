import { describe, test, expect } from "vitest";
import { searchProducts, countSearchProducts } from "./searchProducts";

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

describe("searchProducts 結合テスト", () => {
  // 既存の単一キーワード検索・AND検索テスト

  test.each([
    ["空文字", ""],
    ["半角スペースのみ", "   "],
    ["タブのみ", "\t"],
    ["改行のみ", "\n"],
  ])("%sの場合は空配列を返す", async (_, keyword) => {
    // Act
    const products = await searchProducts(keyword);

    // Assert
    expect(products).toEqual([]);
  });
});

describe("countSearchProducts テスト", () => {
  test.each([
    ["空文字", ""],
    ["半角スペースのみ", "   "],
    ["タブのみ", "\t"],
    ["改行のみ", "\n"],
  ])("%sの場合は0を返す", async (_, keyword) => {
    // Act
    const count = await countSearchProducts(keyword);

    // Assert
    expect(count).toBe(0);
  });
});

describe("検索結果の最大取得件数", () => {
  test("6件以上一致する場合でも最大5件取得する", async () => {
    // Arrange
    const keyword = "プ";

    // Act
    const totalCount = await countSearchProducts(keyword);
    const products = await searchProducts(keyword);

    // Assert
    expect(totalCount).toBeGreaterThanOrEqual(6);
    expect(products).toHaveLength(5);
  });
});

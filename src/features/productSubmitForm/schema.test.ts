import { describe, expect, it } from "vitest";
import { productSubmitFormSchema } from "./schema";
import {
  MAX_SCREENSHOT_COUNT,
  MAX_SCREENSHOT_SIZE_BYTES,
  MAX_THUMBNAIL_SIZE_BYTES,
  PRICING_PLAN_VALUES,
  PRODUCT_CATEGORIES,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_FEATURES_MAX_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_TAGLINE_MAX_LENGTH,
  PRODUCT_TAGS_MAX_COUNT,
  PRODUCT_TAGS_MAX_LENGTH,
  PRODUCT_TECHNOLOGIES_MAX_COUNT,
  PRODUCT_TECHNOLOGY_MAX_LENGTH,
} from "./constants";

const createFile = ({
  name = "test.png",
  type = "image/png",
  size = 1024,
}: {
  name?: string;
  type?: string;
  size?: number;
} = {}) => {
  return new File([new Uint8Array(size)], name, { type });
};

describe("productName", () => {
  const schema = productSubmitFormSchema.shape.productName;

  it("正常な文字列なら成功する", () => {
    const result = schema.safeParse("ProductJP");

    expect(result.success).toBe(true);
  });

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("空白だけなら失敗する", () => {
    const result = schema.safeParse("   ");

    expect(result.success).toBe(false);
  });

  it(`上限文字数（${PRODUCT_NAME_MAX_LENGTH}文字）なら成功する`, () => {
    const result = schema.safeParse("a".repeat(PRODUCT_NAME_MAX_LENGTH));

    expect(result.success).toBe(true);
  });

  it("上限文字数を1文字超えると失敗する", () => {
    const result = schema.safeParse("a".repeat(PRODUCT_NAME_MAX_LENGTH + 1));

    expect(result.success).toBe(false);
  });

  it("前後の空白を除去する", () => {
    const result = schema.safeParse("  ProductJP  ");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe("ProductJP");
    }
  });
});

describe("productTagline", () => {
  const schema = productSubmitFormSchema.shape.productTagline;

  it("正常な文字列なら成功する", () => {
    const result = schema.safeParse("日本のプロダクトを発見しよう");

    expect(result.success).toBe(true);
  });

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("空白だけなら失敗する", () => {
    const result = schema.safeParse("   ");

    expect(result.success).toBe(false);
  });

  it(`上限文字数（${PRODUCT_TAGLINE_MAX_LENGTH}文字）なら成功する`, () => {
    const result = schema.safeParse("a".repeat(PRODUCT_TAGLINE_MAX_LENGTH));

    expect(result.success).toBe(true);
  });

  it("上限文字数を1文字超えると失敗する", () => {
    const result = schema.safeParse("a".repeat(PRODUCT_TAGLINE_MAX_LENGTH + 1));

    expect(result.success).toBe(false);
  });

  it("前後の空白を除去する", () => {
    const result = schema.safeParse("  日本のプロダクトを発見しよう  ");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe("日本のプロダクトを発見しよう");
    }
  });
});

describe("productWebsite", () => {
  const schema = productSubmitFormSchema.shape.productWebsite;

  it("HTTPSのURLなら成功する", () => {
    const result = schema.safeParse("https://example.com");

    expect(result.success).toBe(true);
  });

  it("HTTPのURLなら成功する", () => {
    const result = schema.safeParse("http://example.com");

    expect(result.success).toBe(true);
  });

  it("パスやクエリを含むURLでも成功する", () => {
    const result = schema.safeParse("https://example.com/products?id=123");

    expect(result.success).toBe(true);
  });

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("空白だけなら失敗する", () => {
    const result = schema.safeParse("   ");

    expect(result.success).toBe(false);
  });

  it("プロトコルがないURLなら失敗する", () => {
    const result = schema.safeParse("example.com");

    expect(result.success).toBe(false);
  });

  it("FTPのURLなら失敗する", () => {
    const result = schema.safeParse("ftp://example.com");

    expect(result.success).toBe(false);
  });

  it("不正なホスト名なら失敗する", () => {
    const result = schema.safeParse("https://invalid");

    expect(result.success).toBe(false);
  });

  it("前後の空白を除去してURLを検証する", () => {
    const result = schema.safeParse("  https://example.com  ");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe("https://example.com");
    }
  });
});

describe("productCategory", () => {
  const schema = productSubmitFormSchema.shape.productCategory;

  it.each(PRODUCT_CATEGORIES)(
    "有効なカテゴリー「%s」なら成功する",
    (category) => {
      const result = schema.safeParse(category);

      expect(result.success).toBe(true);
    },
  );

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("定義されていないカテゴリーなら失敗する", () => {
    const result = schema.safeParse("invalid-category");

    expect(result.success).toBe(false);
  });
});

describe("productTags", () => {
  const schema = productSubmitFormSchema.shape.productTags;

  it("タグが1つなら成功する", () => {
    const result = schema.safeParse(["Next.js"]);

    expect(result.success).toBe(true);
  });

  it("空配列なら失敗する", () => {
    const result = schema.safeParse([]);

    expect(result.success).toBe(false);
  });

  it("空文字のタグが含まれていると失敗する", () => {
    const result = schema.safeParse([""]);

    expect(result.success).toBe(false);
  });

  it("空白だけのタグが含まれていると失敗する", () => {
    const result = schema.safeParse(["   "]);

    expect(result.success).toBe(false);
  });

  it(`タグが上限文字数（${PRODUCT_TAGS_MAX_LENGTH}文字）なら成功する`, () => {
    const result = schema.safeParse(["a".repeat(PRODUCT_TAGS_MAX_LENGTH)]);

    expect(result.success).toBe(true);
  });

  it("タグの上限文字数を1文字超えると失敗する", () => {
    const result = schema.safeParse(["a".repeat(PRODUCT_TAGS_MAX_LENGTH + 1)]);

    expect(result.success).toBe(false);
  });

  it(`上限件数（${PRODUCT_TAGS_MAX_COUNT}件）なら成功する`, () => {
    const tags = Array.from(
      { length: PRODUCT_TAGS_MAX_COUNT },
      (_, index) => `tag-${index + 1}`,
    );

    const result = schema.safeParse(tags);

    expect(result.success).toBe(true);
  });

  it("上限件数を1件超えると失敗する", () => {
    const tags = Array.from(
      { length: PRODUCT_TAGS_MAX_COUNT + 1 },
      (_, index) => `tag-${index + 1}`,
    );

    const result = schema.safeParse(tags);

    expect(result.success).toBe(false);
  });

  it("各タグの前後の空白を除去する", () => {
    const result = schema.safeParse(["  Next.js  ", "  React  "]);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(["Next.js", "React"]);
    }
  });
});

describe("productDescription", () => {
  const schema = productSubmitFormSchema.shape.productDescription;

  it("正常な文字列なら成功する", () => {
    const result = schema.safeParse(
      "日本の個人開発プロダクトを発見できるサービスです。",
    );

    expect(result.success).toBe(true);
  });

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("空白だけなら失敗する", () => {
    const result = schema.safeParse("   ");

    expect(result.success).toBe(false);
  });

  it(`上限文字数（${PRODUCT_DESCRIPTION_MAX_LENGTH}文字）なら成功する`, () => {
    const result = schema.safeParse("a".repeat(PRODUCT_DESCRIPTION_MAX_LENGTH));

    expect(result.success).toBe(true);
  });

  it("上限文字数を1文字超えると失敗する", () => {
    const result = schema.safeParse(
      "a".repeat(PRODUCT_DESCRIPTION_MAX_LENGTH + 1),
    );

    expect(result.success).toBe(false);
  });

  it("前後の空白を除去する", () => {
    const result = schema.safeParse("  プロダクトの説明  ");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe("プロダクトの説明");
    }
  });
});

describe("productFeatures", () => {
  const schema = productSubmitFormSchema.shape.productFeatures;

  it("正常な文字列なら成功する", () => {
    const result = schema.safeParse("投稿・投票・コメント機能");

    expect(result.success).toBe(true);
  });

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("空白だけなら失敗する", () => {
    const result = schema.safeParse("   ");

    expect(result.success).toBe(false);
  });

  it(`上限文字数（${PRODUCT_FEATURES_MAX_LENGTH}文字）なら成功する`, () => {
    const result = schema.safeParse("a".repeat(PRODUCT_FEATURES_MAX_LENGTH));

    expect(result.success).toBe(true);
  });

  it("上限文字数を1文字超えると失敗する", () => {
    const result = schema.safeParse(
      "a".repeat(PRODUCT_FEATURES_MAX_LENGTH + 1),
    );

    expect(result.success).toBe(false);
  });

  it("前後の空白を除去する", () => {
    const result = schema.safeParse("  投稿・投票機能  ");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toBe("投稿・投票機能");
    }
  });
});

describe("productTechnologies", () => {
  const schema = productSubmitFormSchema.shape.productTechnologies;

  it("技術スタックが1つなら成功する", () => {
    const result = schema.safeParse(["Next.js"]);

    expect(result.success).toBe(true);
  });

  it("空配列なら失敗する", () => {
    const result = schema.safeParse([]);

    expect(result.success).toBe(false);
  });

  it("空文字の技術スタックが含まれていると失敗する", () => {
    const result = schema.safeParse([""]);

    expect(result.success).toBe(false);
  });

  it("空白だけの技術スタックが含まれていると失敗する", () => {
    const result = schema.safeParse(["   "]);

    expect(result.success).toBe(false);
  });

  it(`技術スタックが上限文字数（${PRODUCT_TECHNOLOGY_MAX_LENGTH}文字）なら成功する`, () => {
    const result = schema.safeParse([
      "a".repeat(PRODUCT_TECHNOLOGY_MAX_LENGTH),
    ]);

    expect(result.success).toBe(true);
  });

  it("技術スタックの上限文字数を1文字超えると失敗する", () => {
    const result = schema.safeParse([
      "a".repeat(PRODUCT_TECHNOLOGY_MAX_LENGTH + 1),
    ]);

    expect(result.success).toBe(false);
  });

  it(`上限件数（${PRODUCT_TECHNOLOGIES_MAX_COUNT}件）なら成功する`, () => {
    const technologies = Array.from(
      { length: PRODUCT_TECHNOLOGIES_MAX_COUNT },
      (_, index) => `tech-${index + 1}`,
    );

    const result = schema.safeParse(technologies);

    expect(result.success).toBe(true);
  });

  it("上限件数を1件超えると失敗する", () => {
    const technologies = Array.from(
      { length: PRODUCT_TECHNOLOGIES_MAX_COUNT + 1 },
      (_, index) => `tech-${index + 1}`,
    );

    const result = schema.safeParse(technologies);

    expect(result.success).toBe(false);
  });

  it("各技術スタックの前後の空白を除去する", () => {
    const result = schema.safeParse(["  Next.js  ", "  Supabase  "]);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(["Next.js", "Supabase"]);
    }
  });
});

describe("productPricingType", () => {
  const schema = productSubmitFormSchema.shape.productPricingType;

  it.each(PRICING_PLAN_VALUES)(
    "有効な料金タイプ「%s」なら成功する",
    (pricingType) => {
      const result = schema.safeParse(pricingType);

      expect(result.success).toBe(true);
    },
  );

  it("空文字なら失敗する", () => {
    const result = schema.safeParse("");

    expect(result.success).toBe(false);
  });

  it("定義されていない料金タイプなら失敗する", () => {
    const result = schema.safeParse("invalid-pricing-type");

    expect(result.success).toBe(false);
  });
});

describe("productThumbnail", () => {
  const schema = productSubmitFormSchema.shape.productThumbnail;

  it.each([
    ["PNG", "thumbnail.png", "image/png"],
    ["JPEG", "thumbnail.jpg", "image/jpeg"],
    ["SVG", "thumbnail.svg", "image/svg+xml"],
  ])("%s画像なら成功する", (_, name, type) => {
    const file = createFile({ name, type });

    const result = schema.safeParse(file);

    expect(result.success).toBe(true);
  });

  it("未選択なら失敗する", () => {
    const result = schema.safeParse(undefined);

    expect(result.success).toBe(false);
  });

  it(`ファイルサイズが上限値（${MAX_THUMBNAIL_SIZE_BYTES} bytes）なら成功する`, () => {
    const file = createFile({
      size: MAX_THUMBNAIL_SIZE_BYTES,
    });

    const result = schema.safeParse(file);

    expect(result.success).toBe(true);
  });

  it("ファイルサイズが上限値を1 byte超えると失敗する", () => {
    const file = createFile({
      size: MAX_THUMBNAIL_SIZE_BYTES + 1,
    });

    const result = schema.safeParse(file);

    expect(result.success).toBe(false);
  });

  it("対応していないMIMEタイプなら失敗する", () => {
    const file = createFile({
      name: "thumbnail.txt",
      type: "text/plain",
    });

    const result = schema.safeParse(file);

    expect(result.success).toBe(false);
  });
});

describe("productScreenshots", () => {
  const schema = productSubmitFormSchema.shape.productScreenshots;

  it("未選択なら成功する", () => {
    const result = schema.safeParse(undefined);

    expect(result.success).toBe(true);
  });

  it("空配列なら成功する", () => {
    const result = schema.safeParse([]);

    expect(result.success).toBe(true);
  });

  it.each([
    ["PNG", "screenshot.png", "image/png"],
    ["JPEG", "screenshot.jpg", "image/jpeg"],
    ["SVG", "screenshot.svg", "image/svg+xml"],
  ])("%s画像1枚なら成功する", (_, name, type) => {
    const files = [
      createFile({
        name,
        type,
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(true);
  });

  it("対応している異なるMIMEタイプの画像を複数指定しても成功する", () => {
    const files = [
      createFile({
        name: "1.png",
        type: "image/png",
      }),
      createFile({
        name: "2.jpg",
        type: "image/jpeg",
      }),
      createFile({
        name: "3.svg",
        type: "image/svg+xml",
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(true);
  });

  it(`画像サイズが上限値（${MAX_SCREENSHOT_SIZE_BYTES} bytes）なら成功する`, () => {
    const files = [
      createFile({
        size: MAX_SCREENSHOT_SIZE_BYTES,
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(true);
  });

  it("画像サイズが上限値を1 byte超えると失敗する", () => {
    const files = [
      createFile({
        size: MAX_SCREENSHOT_SIZE_BYTES + 1,
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(false);
  });

  it("複数画像のうち1枚でもサイズ上限を超えていると失敗する", () => {
    const files = [
      createFile({
        name: "valid.png",
        size: MAX_SCREENSHOT_SIZE_BYTES,
      }),
      createFile({
        name: "too-large.png",
        size: MAX_SCREENSHOT_SIZE_BYTES + 1,
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(false);
  });

  it("対応していないMIMEタイプが含まれていると失敗する", () => {
    const files = [
      createFile({
        name: "test.txt",
        type: "text/plain",
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(false);
  });

  it("複数画像のうち1枚でも未対応のMIMEタイプなら失敗する", () => {
    const files = [
      createFile({
        name: "valid.png",
        type: "image/png",
      }),
      createFile({
        name: "invalid.txt",
        type: "text/plain",
      }),
    ];

    const result = schema.safeParse(files);

    expect(result.success).toBe(false);
  });

  it(`上限枚数（${MAX_SCREENSHOT_COUNT}枚）なら成功する`, () => {
    const files = Array.from({ length: MAX_SCREENSHOT_COUNT }, (_, index) =>
      createFile({
        name: `screenshot-${index + 1}.png`,
        type: "image/png",
      }),
    );

    const result = schema.safeParse(files);

    expect(result.success).toBe(true);
  });

  it("上限枚数を1枚超えると失敗する", () => {
    const files = Array.from({ length: MAX_SCREENSHOT_COUNT + 1 }, (_, index) =>
      createFile({
        name: `screenshot-${index + 1}.png`,
        type: "image/png",
      }),
    );

    const result = schema.safeParse(files);

    expect(result.success).toBe(false);
  });
});

describe("productSubmitFormSchema", () => {
  it("すべて正常な値ならフォーム全体のバリデーションに成功する", () => {
    const input = {
      productName: "ProductJP",
      productTagline: "日本のプロダクトを発見しよう",
      productWebsite: "https://example.com",
      productCategory: PRODUCT_CATEGORIES[0],
      productTags: ["Next.js", "個人開発"],
      productDescription: "日本の個人開発プロダクトを発見できるサービスです。",
      productFeatures: "投稿・投票・コメント機能",
      productTechnologies: ["Next.js", "Supabase"],
      productPricingType: PRICING_PLAN_VALUES[0],
      productThumbnail: createFile({
        name: "thumbnail.png",
        type: "image/png",
      }),
      productScreenshots: [
        createFile({
          name: "screenshot.png",
          type: "image/png",
        }),
      ],
    };

    const result = productSubmitFormSchema.safeParse(input);

    expect(result.success).toBe(true);
  });
});

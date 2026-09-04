import { describe, expect, it } from "vitest";
import { productSubmitFormSchema } from "./schema";

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

describe("productThumbnail", () => {
  it("PNG画像なら成功する", () => {
    const file = createFile({
      name: "thumbnail.png",
      type: "image/png",
    });

    const result =
      productSubmitFormSchema.shape.productThumbnail.safeParse(file);

    expect(result.success).toBe(true);
  });

  it("JPEG画像なら成功する", () => {
    const file = createFile({
      name: "thumbnail.jpg",
      type: "image/jpeg",
    });

    const result =
      productSubmitFormSchema.shape.productThumbnail.safeParse(file);

    expect(result.success).toBe(true);
  });

  it("SVG画像なら成功する", () => {
    const file = createFile({
      name: "thumbnail.svg",
      type: "image/svg+xml",
    });

    const result =
      productSubmitFormSchema.shape.productThumbnail.safeParse(file);

    expect(result.success).toBe(true);
  });

  it("2MB以下なら成功する", () => {
    const file = createFile({
      size: 2 * 1024 * 1024,
    });

    const result =
      productSubmitFormSchema.shape.productThumbnail.safeParse(file);

    expect(result.success).toBe(true);
  });

  it("2MBを超えると失敗する", () => {
    const file = createFile({
      size: 2 * 1024 * 1024 + 1,
    });

    const result =
      productSubmitFormSchema.shape.productThumbnail.safeParse(file);

    expect(result.success).toBe(false);
  });

  it("対応していないMIMEタイプなら失敗する", () => {
    const file = createFile({
      name: "thumbnail.txt",
      type: "text/plain",
    });

    const result =
      productSubmitFormSchema.shape.productThumbnail.safeParse(file);

    expect(result.success).toBe(false);
  });
});

describe("productScreenshots", () => {
  it("正常な画像1枚なら成功する", () => {
    const files = [
      createFile({
        name: "screenshot.png",
        type: "image/png",
      }),
    ];

    const result =
      productSubmitFormSchema.shape.productScreenshots.safeParse(files);

    expect(result.success).toBe(true);
  });

  it("複数の正常な画像なら成功する", () => {
    const files = [
      createFile({ name: "1.png", type: "image/png" }),
      createFile({ name: "2.jpg", type: "image/jpeg" }),
      createFile({ name: "3.svg", type: "image/svg+xml" }),
    ];

    const result =
      productSubmitFormSchema.shape.productScreenshots.safeParse(files);

    expect(result.success).toBe(true);
  });

  it("2MBを超える画像が含まれていると失敗する", () => {
    const files = [
      createFile({
        name: "large.png",
        type: "image/png",
        size: 2 * 1024 * 1024 + 1,
      }),
    ];

    const result =
      productSubmitFormSchema.shape.productScreenshots.safeParse(files);

    expect(result.success).toBe(false);
  });

  it("対応していないMIMEタイプが含まれていると失敗する", () => {
    const files = [
      createFile({
        name: "test.txt",
        type: "text/plain",
      }),
    ];

    const result =
      productSubmitFormSchema.shape.productScreenshots.safeParse(files);

    expect(result.success).toBe(false);
  });

  it("6枚なら成功する", () => {
    const files = Array.from({ length: 6 }, (_, index) =>
      createFile({
        name: `screenshot-${index}.png`,
        type: "image/png",
      }),
    );

    const result =
      productSubmitFormSchema.shape.productScreenshots.safeParse(files);

    expect(result.success).toBe(true);
  });

  it("7枚なら失敗する", () => {
    const files = Array.from({ length: 7 }, (_, index) =>
      createFile({
        name: `screenshot-${index}.png`,
        type: "image/png",
      }),
    );

    const result =
      productSubmitFormSchema.shape.productScreenshots.safeParse(files);

    expect(result.success).toBe(false);
  });
});

// import { describe, expect, it } from "vitest";

// describe("productThumbnail", () => {
//   it("PNG画像なら成功する", () => {
//     const file = new File(["dummy"], "thumbnail.png", { type: "image/png" });

//     const result = productThumbnailSchema.safeParse(file);

//     expect(result.success).toBe(true);
//   });

//   it("JPEG画像なら成功する", () => {
//     const file = new File(["dummy"], "thumbnail.jpg", { type: "image/jpeg" });

//     const result = productThumbnailSchema.safeParse(file);

//     expect(result.success).toBe(true);
//   });

//   it("許可されていない形式なら失敗する", () => {
//     const file = new File(["dummy"], "thumbnail.gif", { type: "image/gif" });

//     const result = productThumbnailSchema.safeParse(file);

//     expect(result.success).toBe(false);
//   });
// });

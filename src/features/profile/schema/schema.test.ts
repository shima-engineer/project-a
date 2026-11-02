import { describe, expect, it } from "vitest";
import { profileEditFormSchema } from "./schema";
import {
  MAX_AVATAR_SIZE_BYTES,
  DISPLAY_NAME_MAX_LENGTH,
  BIO_MAX_LENGTH,
  WEBSITE_MAX_LENGTH,
  GITHUB_URL_MAX_LENGTH,
  X_URL_MAX_LENGTH,
} from "../constants";

// 正常なフォームデータ
const validData = {
  name: "テストユーザー",
  bio: "",
  websiteURL: "",
  githubURL: "",
  XURL: "",
};

// テスト用のファイルを生成
const createFile = (size: number, type = "image/png"): File => {
  return new File([new Uint8Array(size)], "avatar.png", {
    type,
  });
};

// テスト対象のフィールドにエラーがあるか確認
const expectFieldError = (data: Record<string, unknown>, field: string) => {
  const result = profileEditFormSchema.safeParse(data);

  expect(result.success).toBe(false);

  if (!result.success) {
    expect(result.error.issues.some((issue) => issue.path[0] === field)).toBe(
      true,
    );
  }
};

describe("profileEditFormSchema", () => {
  describe("フォーム全体", () => {
    it("必須項目のみ入力した場合は成功する", () => {
      const result = profileEditFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("すべての項目に正常な値を入力した場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        avatar: createFile(1024),
        name: "テストユーザー",
        bio: "フロントエンドエンジニアです。",
        websiteURL: "https://example.com",
        githubURL: "https://github.com/example",
        XURL: "https://x.com/example",
      });

      expect(result.success).toBe(true);
    });

    it("必須項目が存在しない場合は失敗する", () => {
      const { name: _name, ...data } = validData;

      expectFieldError(data, "name");
    });
  });

  describe("アバター", () => {
    it("未設定の場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        avatar: undefined,
      });

      expect(result.success).toBe(true);
    });

    it.each([
      ["PNG", "image/png"],
      ["JPEG", "image/jpeg"],
    ])("%s形式の場合は成功する", (_, type) => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        avatar: createFile(1024, type),
      });

      expect(result.success).toBe(true);
    });

    it("ファイルサイズが上限ちょうどの場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        avatar: createFile(MAX_AVATAR_SIZE_BYTES),
      });

      expect(result.success).toBe(true);
    });

    it("ファイルサイズが上限を1バイト超えた場合は失敗する", () => {
      expectFieldError(
        {
          ...validData,
          avatar: createFile(MAX_AVATAR_SIZE_BYTES + 1),
        },
        "avatar",
      );
    });

    it.each([
      ["SVG", "image/svg+xml"],
      ["GIF", "image/gif"],
      ["WebP", "image/webp"],
    ])("%s形式の場合は失敗する", (_, type) => {
      expectFieldError(
        {
          ...validData,
          avatar: createFile(1024, type),
        },
        "avatar",
      );
    });

    it("Fileオブジェクト以外の場合は失敗する", () => {
      expectFieldError(
        {
          ...validData,
          avatar: "avatar.png",
        },
        "avatar",
      );
    });
  });

  describe("表示名（name）", () => {
    it("1文字の場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        name: "あ",
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数ちょうどの場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        name: "あ".repeat(DISPLAY_NAME_MAX_LENGTH),
      });

      expect(result.success).toBe(true);
    });

    it("空文字の場合は失敗する", () => {
      expectFieldError({ ...validData, name: "" }, "name");
    });

    it("空白のみの場合は失敗する", () => {
      expectFieldError({ ...validData, name: "   " }, "name");
    });

    it("最大文字数を1文字超えた場合は失敗する", () => {
      expectFieldError(
        {
          ...validData,
          name: "あ".repeat(DISPLAY_NAME_MAX_LENGTH + 1),
        },
        "name",
      );
    });

    it("前後の空白が除去される", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        name: "  テスト  ",
      });

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.name).toBe("テスト");
      }
    });
  });

  describe("自己紹介（bio）", () => {
    it("空文字の場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        bio: "",
      });

      expect(result.success).toBe(true);
    });

    it("undefinedの場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        bio: undefined,
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数ちょうどの場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        bio: "あ".repeat(BIO_MAX_LENGTH),
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数を1文字超えた場合は失敗する", () => {
      expectFieldError(
        {
          ...validData,
          bio: "あ".repeat(BIO_MAX_LENGTH + 1),
        },
        "bio",
      );
    });

    it("前後の空白が除去される", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        bio: "  自己紹介です  ",
      });

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.bio).toBe("自己紹介です");
      }
    });
  });

  describe("WebサイトURL", () => {
    it("空文字の場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        websiteURL: "",
      });

      expect(result.success).toBe(true);
    });

    it.each(["https://example.com", "http://example.com"])(
      "有効なURL（%s）の場合は成功する",
      (url) => {
        const result = profileEditFormSchema.safeParse({
          ...validData,
          websiteURL: url,
        });

        expect(result.success).toBe(true);
      },
    );

    it("最大文字数ちょうどの場合は成功する", () => {
      const prefix = "https://example.com/";
      const url = prefix + "a".repeat(WEBSITE_MAX_LENGTH - prefix.length);

      const result = profileEditFormSchema.safeParse({
        ...validData,
        websiteURL: url,
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数を1文字超えた場合は失敗する", () => {
      const url = "https://example.com/" + "a".repeat(WEBSITE_MAX_LENGTH);

      expectFieldError({ ...validData, websiteURL: url }, "websiteURL");
    });

    it.each([
      ["不正な文字列", "invalid-url"],
      ["HTTP以外のプロトコル", "ftp://example.com"],
      ["ドメインがないURL", "https://"],
    ])("%sの場合は失敗する", (_, url) => {
      expectFieldError({ ...validData, websiteURL: url }, "websiteURL");
    });
  });

  describe("GitHub URL", () => {
    it("空文字の場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        githubURL: "",
      });

      expect(result.success).toBe(true);
    });

    it.each(["https://github.com/example", "http://github.com/example"])(
      "有効なGitHub URL（%s）の場合は成功する",
      (url) => {
        const result = profileEditFormSchema.safeParse({
          ...validData,
          githubURL: url,
        });

        expect(result.success).toBe(true);
      },
    );

    it("最大文字数ちょうどの場合は成功する", () => {
      const prefix = "https://github.com/";
      const url = prefix + "a".repeat(GITHUB_URL_MAX_LENGTH - prefix.length);

      const result = profileEditFormSchema.safeParse({
        ...validData,
        githubURL: url,
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数を1文字超えた場合は失敗する", () => {
      const url = "https://github.com/" + "a".repeat(GITHUB_URL_MAX_LENGTH);

      expectFieldError({ ...validData, githubURL: url }, "githubURL");
    });

    it.each([
      ["不正な文字列", "invalid-url"],
      ["GitHub以外のドメイン", "https://example.com/user"],
      ["偽装ドメイン", "https://github.com.evil.com/user"],
      ["HTTP以外のプロトコル", "ftp://github.com/user"],
    ])("%sの場合は失敗する", (_, url) => {
      expectFieldError({ ...validData, githubURL: url }, "githubURL");
    });
  });

  describe("X URL", () => {
    it("空文字の場合は成功する", () => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        XURL: "",
      });

      expect(result.success).toBe(true);
    });

    it.each([
      "https://x.com/example",
      "http://x.com/example",
      "https://twitter.com/example",
      "http://twitter.com/example",
    ])("有効なX URL（%s）の場合は成功する", (url) => {
      const result = profileEditFormSchema.safeParse({
        ...validData,
        XURL: url,
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数ちょうどの場合は成功する", () => {
      const prefix = "https://x.com/";
      const url = prefix + "a".repeat(X_URL_MAX_LENGTH - prefix.length);

      const result = profileEditFormSchema.safeParse({
        ...validData,
        XURL: url,
      });

      expect(result.success).toBe(true);
    });

    it("最大文字数を1文字超えた場合は失敗する", () => {
      const url = "https://x.com/" + "a".repeat(X_URL_MAX_LENGTH);

      expectFieldError({ ...validData, XURL: url }, "XURL");
    });

    it.each([
      ["不正な文字列", "invalid-url"],
      ["X以外のドメイン", "https://example.com/user"],
      ["偽装ドメイン", "https://x.com.evil.com/user"],
      ["HTTP以外のプロトコル", "ftp://x.com/user"],
    ])("%sの場合は失敗する", (_, url) => {
      expectFieldError({ ...validData, XURL: url }, "XURL");
    });
  });
});

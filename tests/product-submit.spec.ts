import { test, expect } from "@playwright/test";

test("必須項目を入力してプロダクトを投稿できる", async ({ page }) => {
  await page.goto("http://localhost:3000/posts");
  await page.getByRole("textbox", { name: "プロダクト名 *" }).click();
  await page
    .getByRole("textbox", { name: "プロダクト名 *" })
    .fill("プロダクト名です。");
  await page
    .getByRole("textbox", {
      name: "タグライン * 60文字以内、プロダクトを一言で。",
    })
    .click();
  await page
    .getByRole("textbox", {
      name: "タグライン * 60文字以内、プロダクトを一言で。",
    })
    .fill("タグラインです。");
  await page.getByRole("textbox", { name: "WebサイトURL *" }).click();
  await page
    .getByRole("textbox", { name: "WebサイトURL *" })
    .fill("http://localhost:3000/posts");
  await page.getByLabel("カテゴリー*").selectOption("SaaS");
  await page
    .getByRole("textbox", { name: "タグ * 最大5つ。Enterで追加" })
    .click();
  await page
    .getByRole("textbox", { name: "タグ * 最大5つ。Enterで追加" })
    .fill("AI");
  await page
    .getByRole("textbox", { name: "タグ * 最大5つ。Enterで追加" })
    .press("Enter");
  await page
    .getByRole("textbox", { name: "タグ * 最大5つ。Enterで追加" })
    .fill("タグ");
  await page
    .getByRole("textbox", { name: "タグ * 最大5つ。Enterで追加" })
    .press("Enter");
  await page
    .locator("div")
    .filter({ hasText: /^タグ$/ })
    .click();
  await page.getByRole("button", { name: "タグタグを削除" }).click();
  await page.getByRole("textbox", { name: "説明 *" }).click();
  await page.getByRole("textbox", { name: "説明 *" }).fill("説明です。");
  await page.getByRole("textbox", { name: "主な機能" }).click();
  await page.getByRole("textbox", { name: "主な機能" }).fill("主な機能です。");
  await page
    .getByRole("textbox", { name: "技術スタック * 最大5つ。Enterで追加" })
    .click();
  await page
    .getByRole("textbox", { name: "技術スタック * 最大5つ。Enterで追加" })
    .fill("Next.js");
  await page
    .getByRole("textbox", { name: "技術スタック * 最大5つ。Enterで追加" })
    .press("Enter");
  await page
    .getByRole("textbox", { name: "技術スタック * 最大5つ。Enterで追加" })
    .fill("TypeScript");
  await page
    .getByRole("textbox", { name: "技術スタック * 最大5つ。Enterで追加" })
    .press("Enter");
  await page.getByRole("button", { name: "Next.jsタグを削除" }).click();
  await page.getByText("Freemium").click();
  await page.getByRole("radio", { name: "Freemium" }).check();
  await page.locator("form img").click();
  await page
    .getByRole("button", {
      name: /サムネイル/,
    })
    .setInputFiles("tests/fixtures/thumbnail.png");
  await page.locator(".w-16").click();
  await page
    .getByRole("button", {
      name: /スクリーンショット/,
    })
    .setInputFiles("tests/fixtures/screenshot.png");
  await page
    .getByRole("main")
    .getByRole("button", { name: "投稿する" })
    .click();
  await page
    .getByRole("textbox", { name: "WebサイトURL *" })
    .fill("https://chatgpt.com/c/6abdb324-ea04-83ee-8217-6a842ca4d10a");
  await page
    .getByRole("main")
    .getByRole("button", { name: "投稿する" })
    .click();
  await expect(
    page.getByText("プロダクトを投稿しました").first(),
  ).toBeVisible();
});

test("必須項目が未入力の場合は投稿できない", async ({ page }) => {
  await page.goto("http://localhost:3000/posts");

  const submitButton = page
    .getByRole("main")
    .getByRole("button", { name: "投稿する" });

  await submitButton.click();

  // 投稿成功していないことを確認
  await expect(page.getByText("プロダクトを投稿しました")).not.toBeVisible();

  // 必須項目が未入力のままであることを確認
  await expect(
    page.getByRole("textbox", { name: "プロダクト名 *" }),
  ).toHaveValue("");
});

test("WebサイトURLが不正な場合は投稿できない", async ({ page }) => {
  await page.goto("http://localhost:3000/posts");

  await page
    .getByRole("textbox", { name: "プロダクト名 *" })
    .fill("テストプロダクト");

  await page
    .getByRole("textbox", {
      name: "タグライン * 60文字以内、プロダクトを一言で。",
    })
    .fill("テスト用タグライン");

  const websiteInput = page.getByRole("textbox", {
    name: "WebサイトURL *",
  });

  await websiteInput.fill("invalid-url");

  await page
    .getByRole("main")
    .getByRole("button", { name: "投稿する" })
    .click();

  // 不正なURLでは投稿成功しない
  await expect(page.getByText("プロダクトを投稿しました")).not.toBeVisible();

  // 入力値が残っていることを確認
  await expect(websiteInput).toHaveValue("invalid-url");
});

test("タグを追加・削除できる", async ({ page }) => {
  await page.goto("http://localhost:3000/posts");

  const tagInput = page.getByRole("textbox", {
    name: "タグ * 最大5つ。Enterで追加",
  });

  await tagInput.fill("AI");
  await tagInput.press("Enter");

  const deleteButton = page.getByRole("button", {
    name: "AIタグを削除",
  });

  // タグ追加を確認
  await expect(deleteButton).toBeVisible();

  await deleteButton.click();

  // タグ削除を確認
  await expect(deleteButton).not.toBeVisible();
});

test("サムネイルをアップロードできる", async ({ page }) => {
  await page.goto("http://localhost:3000/posts");

  await page
    .getByRole("button", { name: /サムネイル/ })
    .setInputFiles("tests/fixtures/thumbnail.png");

  await expect(page.locator("form img").first()).toBeVisible();
});

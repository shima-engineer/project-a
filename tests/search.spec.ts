import { test, expect } from "@playwright/test";

test("キーワードでプロダクトを検索できる", async ({ page }) => {
  await page.goto("/");

  // 検索ボタンをクリックして検索モーダルを開く
  await page.getByText("プロダクトを検索…").click();

  // キーワードを入力する
  await page
    .getByPlaceholder("プロダクト名、タグ、技術スタックを検索...")
    .fill("api");

  const dialog = page.getByRole("dialog");

  // 検索結果が表示されることを確認する
  await expect(dialog.getByText("API Monitor")).toBeVisible();
});

test("カテゴリでプロダクトを検索できる", async ({ page }) => {
  await page.goto("/");

  // 検索ボタンをクリックして検索モーダルを開く
  await page.getByText("プロダクトを検索…").click();

  // カテゴリのAIツールをクリック
  await page.getByText("AIツール", { exact: true }).click();

  // 検索結果が表示されることを確認する
  const dialog = page.getByRole("dialog");

  await expect(dialog.getByText("PromptBox")).toBeVisible();

  await expect(dialog.getByText("API Monitor")).not.toBeVisible();
});

test("キーワードとカテゴリでプロダクトを検索できる", async ({ page }) => {
  await page.goto("/");

  // 検索ボタンをクリックして検索モーダルを開く
  await page.getByText("プロダクトを検索…").click();

  // カテゴリのAIツールをクリック
  await page.getByText("AIツール", { exact: true }).click();

  // キーワードを入力する
  const dialog = page.getByRole("dialog");

  await page
    .getByPlaceholder("プロダクト名、タグ、技術スタックを検索...")
    .fill("a");

  // 検索結果が表示されることを確認する
  await expect(
    dialog.getByText("WriteMate", { exact: true }).first(),
  ).toBeVisible();

  await expect(dialog.getByText("PromptBox")).not.toBeVisible();
});

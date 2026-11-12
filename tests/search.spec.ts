import { test, expect } from "@playwright/test";

test("キーワードでプロダクトを検索できる", async ({ page }) => {
  await page.goto("/");

  // 検索ボタンをクリックして検索モーダルを開く
  await page.getByText("プロダクトを検索…").click();

  // キーワードを入力する
  await page
    .getByPlaceholder("プロダクト名、タグ、技術スタックを検索...")
    .fill("api");

  // 検索結果が表示されることを確認する
  await expect(page.getByText("API Monitor")).toBeVisible();
});

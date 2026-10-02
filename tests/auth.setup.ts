import { test as setup, expect } from "@playwright/test";

const authFile = "tests/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: "ログイン" }).click();
  await page.getByRole("textbox", { name: "メールアドレス" }).click();
  await page
    .getByRole("textbox", { name: "メールアドレス" })
    .fill("e2e-test@example.com");
  await page.getByRole("textbox", { name: "パスワード" }).click();
  await page
    .getByRole("textbox", { name: "パスワード" })
    .fill("x/#2KWZ%VvBWJm7");
  await page.getByRole("button", { name: "ログイン" }).click();

  await expect(page.getByText("ログインに成功しました。")).toBeVisible();
  await page.context().storageState({
    path: authFile,
  });
});
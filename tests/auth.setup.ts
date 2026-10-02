import { test as setup, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const authFile = "tests/.auth/user.json";

const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;

if (!email || !password) {
  throw new Error("E2E_EMAIL and E2E_PASSWORD must be set");
}

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: "ログイン" }).click();
  await page.getByRole("textbox", { name: "メールアドレス" }).click();
  await page.getByRole("textbox", { name: "メールアドレス" }).fill(email);
  await page.getByRole("textbox", { name: "パスワード" }).click();
  await page.getByRole("textbox", { name: "パスワード" }).fill(password);
  await page.getByRole("button", { name: "ログイン" }).click();

  await expect(page.getByText("ログインに成功しました。")).toBeVisible();
  await page.context().storageState({
    path: authFile,
  });
});

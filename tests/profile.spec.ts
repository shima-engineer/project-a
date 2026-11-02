import { test, expect, type Page } from "@playwright/test";

// E2E専用ユーザーのIDを環境変数から取得
const profileUserId = process.env.E2E_PROFILE_USER_ID;

if (!profileUserId) {
  throw new Error("E2E_PROFILE_USER_ID を設定してください");
}

const profileURL = `/users/${profileUserId}`;

// テスト用の初期データ
const initialProfile = {
  username: "E2Eテスト",
  bio: "テスト用の自己紹介",
  websiteURL: "https://example.com",
  githubURL: "https://github.com/example",
  XURL: "https://x.com/example",
};

// プロフィール編集モーダルを開く
const openEditModal = async (page: Page) => {
  await page.goto(profileURL);

  await page.getByRole("button", { name: "プロフィールを編集" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  return dialog;
};

// プロフィールの各項目を入力する
const fillProfile = async (
  dialog: ReturnType<Page["getByRole"]>,
  values: typeof initialProfile,
) => {
  await dialog.getByRole("textbox", { name: "表示名" }).fill(values.username);
  await dialog.getByRole("textbox", { name: "自己紹介" }).fill(values.bio);
  await dialog
    .getByRole("textbox", { name: "Webサイト" })
    .fill(values.websiteURL);
  await dialog.getByRole("textbox", { name: "GitHub" }).fill(values.githubURL);
  await dialog.getByRole("textbox", { name: "X (Twitter)" }).fill(values.XURL);
};

// 保存してモーダルが閉じるまで待つ
const saveProfile = async (dialog: ReturnType<Page["getByRole"]>) => {
  await dialog.getByRole("button", { name: "保存" }).click();
  await expect(dialog).toBeHidden();
};

// 保存済みのデータを初期状態に戻す
const resetProfile = async (page: Page) => {
  const dialog = await openEditModal(page);
  await fillProfile(dialog, initialProfile);
  await saveProfile(dialog);
};

// 認証済みユーザーのテスト
test.describe("プロフィール編集", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    // 各テストを同じ状態から開始する
    await resetProfile(page);
  });

  test("正常系：すべての項目を更新できる", async ({ page }) => {
    const updatedProfile = {
      username: "変更後ユーザー",
      bio: "変更後の自己紹介",
      websiteURL: "https://updated.example.com",
      githubURL: "https://github.com/updated",
      XURL: "https://x.com/updated",
    };

    const dialog = await openEditModal(page);

    await fillProfile(dialog, updatedProfile);
    await saveProfile(dialog);

    // 保存後の画面に表示名が反映されている
    await expect(
      page.getByText(updatedProfile.username, { exact: true }),
    ).toBeVisible();

    // リロードしても変更内容が保持される
    await page.reload();

    const reopenedDialog = await openEditModal(page);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "表示名" }),
    ).toHaveValue(updatedProfile.username);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "自己紹介" }),
    ).toHaveValue(updatedProfile.bio);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "Webサイト" }),
    ).toHaveValue(updatedProfile.websiteURL);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "GitHub" }),
    ).toHaveValue(updatedProfile.githubURL);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "X (Twitter)" }),
    ).toHaveValue(updatedProfile.XURL);
  });

  test("正常系：任意項目を空欄にして保存できる", async ({ page }) => {
    const dialog = await openEditModal(page);

    await fillProfile(dialog, {
      ...initialProfile,
      bio: "",
      websiteURL: "",
      githubURL: "",
      XURL: "",
    });

    await saveProfile(dialog);

    // DBに保存された値を再取得する
    await page.reload();

    const reopenedDialog = await openEditModal(page);

    for (const name of ["自己紹介", "Webサイト", "GitHub", "X (Twitter)"]) {
      await expect(
        reopenedDialog.getByRole("textbox", { name, exact: true }),
      ).toHaveValue("");
    }
  });

  test("異常系：表示名が空欄の場合は保存できない", async ({ page }) => {
    const dialog = await openEditModal(page);

    await dialog.getByRole("textbox", { name: "表示名" }).fill("");

    await dialog.getByRole("button", { name: "保存" }).click();

    // バリデーションエラーが表示される
    await expect(dialog.getByText("表示名は必須です。")).toBeVisible();

    // モーダルが閉じない
    await expect(dialog).toBeVisible();

    // 保存済みの表示名は変更されない
    await page.reload();

    const reopenedDialog = await openEditModal(page);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "表示名" }),
    ).toHaveValue(initialProfile.username);
  });

  test("異常系：不正なGitHub URLは保存できない", async ({ page }) => {
    const dialog = await openEditModal(page);

    await dialog
      .getByRole("textbox", { name: "GitHub" })
      .fill("https://example.com/user");

    await dialog.getByRole("button", { name: "保存" }).click();

    await expect(
      dialog.getByText("有効なGitHubのURLを入力してください。"),
    ).toBeVisible();

    await expect(dialog).toBeVisible();

    // 不正なデータが保存されていない
    await page.reload();

    const reopenedDialog = await openEditModal(page);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "GitHub" }),
    ).toHaveValue(initialProfile.githubURL);
  });

  test("キャンセル時に入力内容が破棄される", async ({ page }) => {
    const dialog = await openEditModal(page);

    await dialog
      .getByRole("textbox", { name: "表示名" })
      .fill("保存しない名前");

    await dialog
      .getByRole("textbox", { name: "自己紹介" })
      .fill("保存しない自己紹介");

    await dialog.getByRole("button", { name: "キャンセル" }).click();

    await expect(dialog).toBeHidden();

    // 再度開いた場合、保存済みの値に戻っている
    const reopenedDialog = await openEditModal(page);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "表示名" }),
    ).toHaveValue(initialProfile.username);

    await expect(
      reopenedDialog.getByRole("textbox", { name: "自己紹介" }),
    ).toHaveValue(initialProfile.bio);
  });

  test("アバター画像を変更して保存できる", async ({ page }) => {
    const dialog = await openEditModal(page);

    const avatarPreview = dialog.locator('img[alt="プロフィール画像"]');

    const previousSrc = await avatarPreview.getAttribute("src");

    const pngBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ" +
        "AAAADUlEQVQIHWP4z8DwHwAFgAI/ScLytQAAAABJRU5ErkJggg==",
      "base64",
    );

    await dialog.locator('input[type="file"]').setInputFiles({
      name: "avatar.png",
      mimeType: "image/png",
      buffer: pngBuffer,
    });

    await expect(avatarPreview).toHaveAttribute("src", /blob:/);

    await saveProfile(dialog);

    await page.reload();

    const reopenedDialog = await openEditModal(page);

    const savedAvatar = reopenedDialog.getByRole("img", {
      name: "プロフィール画像",
    });

    await expect(savedAvatar).toBeVisible();
    await expect(savedAvatar).not.toHaveAttribute("src", previousSrc ?? "");
    await expect(savedAvatar).not.toHaveAttribute("src", /blob:/);
  });
});

// 未ログインユーザーのテスト
test.describe("プロフィール編集のアクセス制御", () => {
  test.use({
    storageState: {
      cookies: [],
      origins: [],
    },
  });

  test("未ログインユーザーには編集ボタンが表示されない", async ({ page }) => {
    await page.goto(profileURL);

    await expect(
      page.getByRole("button", { name: "プロフィールを編集" }),
    ).toHaveCount(0);
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import ProductDetailPreview from "./ProductDetailPreview";
import { ProductSubmitFormValues } from "@/features/productSubmitForm/schema";

const renderProductDetailPreview = (
  defaultValues?: Partial<ProductSubmitFormValues>,
) => {
  const Wrapper = () => {
    const methods = useForm<ProductSubmitFormValues>({
      defaultValues: {
        productName: "",
        productTagline: "",
        productDescription: "",
        productFeatures: "",
        productTags: [],
        productScreenshots: [],
        productTechnologies: [],
        productPlans: undefined,
        productCategory: undefined,
        ...defaultValues,
      },
    });

    return (
      <FormProvider {...methods}>
        <ProductDetailPreview />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe("ProductDetailPreview", () => {
  it("未入力の場合はデフォルトの表示になる", () => {
    renderProductDetailPreview();

    expect(screen.getByText("プロダクト名")).toBeInTheDocument();

    expect(
      screen.getByText("タグラインがここに表示されます"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "説明文がここに表示されます。プロダクトが解決する問題、独自の特徴をユーザーに伝えましょう。",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("主な機能がここに表示されます"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "技術スタック",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("タグ")).toBeInTheDocument();

    expect(screen.getAllByText("未設定")).toHaveLength(2);
  });

  it("フォームの入力値をプレビューに表示する", () => {
    renderProductDetailPreview({
      productName: "ProductJP",
      productTagline: "日本のプロダクトを発見",
      productDescription: "プロダクトを投稿できるサービスです。",
      productFeatures: "投稿・投票・コメント",
      productTags: ["開発", "Web"],
      productTechnologies: ["Next.js", "Supabase"],
      productPlans: "Free",
      productCategory: "Developer Tools",
    });

    expect(screen.getByText("ProductJP")).toBeInTheDocument();

    expect(screen.getByText("日本のプロダクトを発見")).toBeInTheDocument();

    expect(
      screen.getByText("プロダクトを投稿できるサービスです。"),
    ).toBeInTheDocument();

    expect(screen.getByText("投稿・投票・コメント")).toBeInTheDocument();

    expect(screen.getByText("開発")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();

    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Supabase")).toBeInTheDocument();

    expect(screen.getByText("Free")).toBeInTheDocument();

    expect(screen.getByText("Developer Tools")).toBeInTheDocument();
  });

  it("スクリーンショットが設定されている場合はObject URLを生成する", async () => {
    const screenshot = new File(["image"], "screenshot.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL).mockReturnValue(
      "blob:http://localhost/screenshot",
    );

    renderProductDetailPreview({
      productScreenshots: [screenshot],
    });

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalledWith(screenshot);
    });
  });

  it("複数のスクリーンショットが設定されている場合はそれぞれObject URLを生成する", async () => {
    const screenshot1 = new File(["image1"], "screenshot1.png", {
      type: "image/png",
    });

    const screenshot2 = new File(["image2"], "screenshot2.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL)
      .mockReturnValueOnce("blob:http://localhost/screenshot1")
      .mockReturnValueOnce("blob:http://localhost/screenshot2");

    renderProductDetailPreview({
      productScreenshots: [screenshot1, screenshot2],
    });

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalledWith(screenshot1);
      expect(URL.createObjectURL).toHaveBeenCalledWith(screenshot2);
    });
  });

  it("アンマウント時にスクリーンショットのObject URLを破棄する", async () => {
    const screenshot = new File(["image"], "screenshot.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL).mockReturnValue(
      "blob:http://localhost/screenshot",
    );

    const { unmount } = renderProductDetailPreview({
      productScreenshots: [screenshot],
    });

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalledWith(screenshot);
    });

    unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:http://localhost/screenshot",
    );
  });
});

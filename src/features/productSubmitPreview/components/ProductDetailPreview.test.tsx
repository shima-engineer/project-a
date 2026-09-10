import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import ProductDetailPreview from "./ProductDetailPreview";
import {
  ProductSubmitFormInput,
  ProductSubmitFormValues,
} from "@/features/productSubmitForm/schema";

const renderProductDetailPreview = (
  defaultValues?: Partial<ProductSubmitFormValues>,
) => {
  const Wrapper = () => {
    const methods = useForm<
      ProductSubmitFormInput,
      unknown,
      ProductSubmitFormValues
    >({
      defaultValues: {
        productName: "",
        productTagline: "",
        productDescription: "",
        productFeatures: "",
        productTags: [],
        productScreenshots: [],
        productTechnologies: [],
        productPlans: "",
        productCategory: "",
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
  it("未入力の場合はプレースホルダーを表示する", () => {
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

    expect(screen.getByText("技術スタック")).toBeInTheDocument();
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

  it("スクリーンショットをプレビュー表示する", async () => {
    const screenshot = new File(["image"], "screenshot.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL).mockReturnValue(
      "blob:http://localhost/screenshot",
    );

    renderProductDetailPreview({
      productScreenshots: [screenshot],
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(screenshot);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", expect.stringContaining("blob"));
  });

  it("アンマウント時にObject URLを破棄する", () => {
    const screenshot = new File(["image"], "screenshot.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL).mockReturnValue(
      "blob:http://localhost/screenshot",
    );

    const { unmount } = renderProductDetailPreview({
      productScreenshots: [screenshot],
    });

    unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:http://localhost/screenshot",
    );
  });
});

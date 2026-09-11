import { render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import ProductItemPreview from "./ProductItemPreview";
import { ProductSubmitFormValues } from "@/features/productSubmitForm/schema";

const renderProductItemPreview = (
  defaultValues?: Partial<ProductSubmitFormValues>,
) => {
  const Wrapper = () => {
    const methods = useForm<ProductSubmitFormValues>({
      defaultValues: {
        productName: "",
        productTagline: "",
        productTags: [],
        productThumbnail: undefined,
        ...defaultValues,
      },
    });

    return (
      <FormProvider {...methods}>
        <ProductItemPreview />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe("ProductItemPreview", () => {
  it("未入力の場合はデフォルトの表示になる", () => {
    renderProductItemPreview();

    expect(screen.getByText("プロダクト名")).toBeInTheDocument();

    expect(
      screen.getByText("タグラインがここに表示されます"),
    ).toBeInTheDocument();

    expect(screen.getByText("タグ")).toBeInTheDocument();
  });

  it("フォームの入力値をプレビューに表示する", () => {
    renderProductItemPreview({
      productName: "ProductJP",
      productTagline: "日本のプロダクトを発見",
      productTags: ["開発", "Web"],
    });

    expect(screen.getByText("ProductJP")).toBeInTheDocument();

    expect(screen.getByText("日本のプロダクトを発見")).toBeInTheDocument();

    expect(screen.getByText("開発")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
  });

  it("サムネイルが設定されている場合はObject URLを生成する", async () => {
    const thumbnail = new File(["thumbnail"], "thumbnail.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL).mockReturnValue(
      "blob:http://localhost/thumbnail",
    );

    renderProductItemPreview({
      productThumbnail: thumbnail,
    });

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalledWith(thumbnail);
    });
  });

  it("アンマウント時にObject URLを破棄する", async () => {
    const thumbnail = new File(["thumbnail"], "thumbnail.png", {
      type: "image/png",
    });

    vi.mocked(URL.createObjectURL).mockReturnValue(
      "blob:http://localhost/thumbnail",
    );

    const { unmount } = renderProductItemPreview({
      productThumbnail: thumbnail,
    });

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalledWith(thumbnail);
    });

    unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:http://localhost/thumbnail",
    );
  });
});

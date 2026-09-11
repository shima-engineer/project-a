import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import BasicInfoSection from "./BasicInfoSection";
import SubmitActionBar from "./SubmitActionBar";
import {
  productSubmitFormSchema,
  type ProductSubmitFormInput,
  type ProductSubmitFormValues,
} from "../schema";
import {
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_TAGLINE_MAX_LENGTH,
  PRODUCT_TAGS_MAX_LENGTH,
  PRODUCT_TAGS_MAX_COUNT,
} from "../constants";

// TODO13:仮のテストコード。後で修正したい
const renderBasicInfoSection = () => {
  const Wrapper = () => {
    const methods = useForm<
      ProductSubmitFormInput,
      unknown,
      ProductSubmitFormValues
    >({
      resolver: zodResolver(productSubmitFormSchema),
      defaultValues: {
        productName: "",
        productTagline: "",
        productWebsite: "",
        productCategory: "",
        productTags: [],
        productDescription: "",
        productFeatures: "",
        productTechnologies: [],
        productPlans: "",
      },
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <BasicInfoSection />
          <SubmitActionBar />
        </form>
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe("BasicInfoSection", () => {
  describe("表示", () => {
    it("必要な入力欄が表示される", () => {
      renderBasicInfoSection();

      expect(
        screen.getByRole("textbox", { name: /プロダクト名/ }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", { name: /タグライン/ }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", { name: /WebサイトURL/ }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("combobox", { name: /カテゴリー/ }),
      ).toBeInTheDocument();

      expect(screen.getByRole("textbox", { name: /タグ/ })).toBeInTheDocument();
    });
  });

  describe("入力・操作", () => {
    it("プロダクト名を入力できる", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /プロダクト名/,
      });

      await user.type(input, "ProductJP");

      expect(input).toHaveValue("ProductJP");
    });

    it("プロダクト名の文字数が更新される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /プロダクト名/,
      });

      await user.type(input, "ProductJP");

      expect(
        screen.getByText(`9/${PRODUCT_NAME_MAX_LENGTH}`),
      ).toBeInTheDocument();
    });

    it("タグラインの文字数が更新される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグライン/,
      });

      await user.type(input, "ProductJP");

      expect(
        screen.getByText(`9/${PRODUCT_TAGLINE_MAX_LENGTH}`),
      ).toBeInTheDocument();
    });

    it("カテゴリーを選択できる", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const select = screen.getByRole("combobox", {
        name: /カテゴリー/,
      });

      await user.selectOptions(select, "SaaS");

      expect(select).toHaveValue("SaaS");
    });
  });

  describe("タグ", () => {
    it("Enterでタグを追加できる", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグ/,
      });

      await user.type(input, "React{Enter}");

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(input).toHaveValue("");
    });

    it("タグを削除できる", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグ/,
      });

      await user.type(input, "React{Enter}");

      await user.click(
        screen.getByRole("button", {
          name: "Reactタグを削除",
        }),
      );

      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    it("空文字のタグは追加されない", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグ/,
      });

      await user.type(input, "   {Enter}");

      expect(
        screen.queryByRole("button", {
          name: /タグを削除/,
        }),
      ).not.toBeInTheDocument();
    });

    it("同じタグは追加できない", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグ/,
      });

      await user.type(input, "React{Enter}");
      await user.type(input, "React{Enter}");

      expect(
        await screen.findByText("同じタグは追加できません。"),
      ).toBeInTheDocument();
    });

    it("21文字のタグは追加できない", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグ/,
      });

      await user.type(input, `${"a".repeat(21)}{Enter}`);

      expect(
        await screen.findByText(
          `タグは${PRODUCT_TAGS_MAX_LENGTH}文字以内で入力してください。`,
        ),
      ).toBeInTheDocument();
    });

    it("6個目のタグは追加できない", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグ/,
      });

      for (const tag of ["React", "Next.js", "TypeScript", "Vitest", "RTL"]) {
        await user.type(input, `${tag}{Enter}`);
      }

      await user.type(input, "Zod{Enter}");

      expect(
        await screen.findByText(
          `タグは最大${PRODUCT_TAGS_MAX_COUNT}つまでです。`,
        ),
      ).toBeInTheDocument();

      expect(screen.queryByText("Zod")).not.toBeInTheDocument();
    });
  });

  describe("バリデーション", () => {
    it("プロダクト名が未入力の場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText("プロダクト名は必須です。"),
      ).toBeInTheDocument();
    });

    it("プロダクト名が最大文字数を超える場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /プロダクト名/,
      });

      await user.type(input, "a".repeat(PRODUCT_NAME_MAX_LENGTH + 1));

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText(
          `${PRODUCT_NAME_MAX_LENGTH}文字以内で入力してください。`,
        ),
      ).toBeInTheDocument();
    });

    it("タグラインが未入力の場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText("タグラインは必須です。"),
      ).toBeInTheDocument();
    });

    it("タグラインが最大文字数を超える場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /タグライン/,
      });

      await user.type(input, "a".repeat(PRODUCT_TAGLINE_MAX_LENGTH + 1));

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText(
          `${PRODUCT_TAGLINE_MAX_LENGTH}文字以内で入力してください。`,
        ),
      ).toBeInTheDocument();
    });

    it("WebサイトURLが空の場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText("プロダクトURLを入力してください。"),
      ).toBeInTheDocument();
    });

    it("WebサイトURLが不正な場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      const input = screen.getByRole("textbox", {
        name: /WebサイトURL/,
      });

      await user.type(input, "invalid-url");

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText("有効なURLを入力してください。"),
      ).toBeInTheDocument();
    });

    it("カテゴリーが未選択の場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText("カテゴリーを選択してください。"),
      ).toBeInTheDocument();
    });

    it("タグが1つもない場合、エラーが表示される", async () => {
      const user = userEvent.setup();
      renderBasicInfoSection();

      await user.click(screen.getByRole("button", { name: "投稿する" }));

      expect(
        await screen.findByText("タグを1つ以上追加してください。"),
      ).toBeInTheDocument();
    });
  });
});

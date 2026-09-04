import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import MediaSection from "./MediaSection";
import {
  productSubmitFormSchema,
  type ProductSubmitFormInput,
  type ProductSubmitFormValues,
} from "../schema";
import { MAX_SCREENSHOT_COUNT } from "../constants";

const renderMediaSection = () => {
  const Wrapper = () => {
    const methods = useForm<
      ProductSubmitFormInput,
      unknown,
      ProductSubmitFormValues
    >({
      resolver: zodResolver(productSubmitFormSchema),
      defaultValues: {
        productThumbnail: undefined,
        productScreenshots: [],
      },
    });

    return (
      <FormProvider {...methods}>
        <MediaSection />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

const createImageFile = (name = "test.png", type = "image/png") => {
  return new File(["file"], name, { type });
};

const getThumbnailInput = () => {
  return document.getElementById("productThumbnail") as HTMLInputElement;
};

const getScreenshotInput = () => {
  return document.getElementById("productScreenshot") as HTMLInputElement;
};

const selectFile = (input: HTMLInputElement, file: File) => {
  fireEvent.change(input, {
    target: {
      files: [file],
    },
  });
};

describe("MediaSection", () => {
  describe("表示", () => {
    it("必要な入力欄が表示される", () => {
      renderMediaSection();

      expect(getThumbnailInput()).toBeInTheDocument();
      expect(getScreenshotInput()).toBeInTheDocument();
    });
  });

  describe("サムネイル", () => {
    it("画像をアップロードすると「別の画像に変更」が表示される", () => {
      renderMediaSection();

      const input = getThumbnailInput();
      const file = createImageFile("thumbnail.png");

      selectFile(input, file);

      expect(screen.getByText("別の画像に変更")).toBeInTheDocument();
    });

    it("画像をアップロードするとプレビューが表示される", () => {
      renderMediaSection();

      const input = getThumbnailInput();
      const file = createImageFile("thumbnail.png");

      selectFile(input, file);

      expect(screen.getByAltText("Product Thumbnail")).toBeInTheDocument();
    });

    it("アップロードした画像をクリックするとモーダルが表示される", async () => {
      const user = userEvent.setup();

      renderMediaSection();

      const input = getThumbnailInput();
      const file = createImageFile("thumbnail.png");

      selectFile(input, file);

      await user.click(screen.getByAltText("Product Thumbnail"));

      expect(
        screen.getByRole("dialog", {
          name: "サムネイル画像",
        }),
      ).toBeInTheDocument();
    });

    it("アップロード後、別の画像に差し替えられる", () => {
      renderMediaSection();

      const input = getThumbnailInput();

      const firstFile = createImageFile("first.png");
      const secondFile = createImageFile("second.png");

      selectFile(input, firstFile);
      selectFile(input, secondFile);

      expect(input.files).toHaveLength(1);
      expect(input.files?.[0]).toBe(secondFile);
    });

    it("ドラッグアンドドロップでアップロードできる", () => {
      renderMediaSection();

      const file = createImageFile("thumbnail.png");

      const input = getThumbnailInput();
      const dropArea = input.closest("label");

      expect(dropArea).not.toBeNull();

      fireEvent.drop(dropArea!, {
        dataTransfer: {
          files: [file],
        },
      });

      expect(screen.getByAltText("Product Thumbnail")).toBeInTheDocument();

      expect(screen.getByText("別の画像に変更")).toBeInTheDocument();
    });
  });

  describe("スクリーンショット", () => {
    it("画像を1枚アップロードするとプレビューが1枚表示される", () => {
      renderMediaSection();

      const input = getScreenshotInput();
      const file = createImageFile("screenshot.png");

      selectFile(input, file);

      expect(screen.getAllByAltText("Product Screenshot")).toHaveLength(1);
    });

    it("複数枚アップロードできる", () => {
      renderMediaSection();

      const input = getScreenshotInput();

      const firstFile = createImageFile("first.png");
      const secondFile = createImageFile("second.png");

      selectFile(input, firstFile);
      selectFile(input, secondFile);

      expect(screen.getAllByAltText("Product Screenshot")).toHaveLength(2);
    });

    it("アップロードしたスクリーンショットを削除できる", async () => {
      const user = userEvent.setup();

      renderMediaSection();

      const input = getScreenshotInput();
      const file = createImageFile("screenshot.png");

      selectFile(input, file);

      const screenshot = screen.getByAltText("Product Screenshot");

      expect(screenshot).toBeInTheDocument();

      const deleteIcon = screenshot.parentElement?.querySelector("svg");

      expect(deleteIcon).not.toBeNull();

      await user.click(deleteIcon!);

      expect(
        screen.queryByAltText("Product Screenshot"),
      ).not.toBeInTheDocument();
    });

    it(`${MAX_SCREENSHOT_COUNT}枚まで追加できる`, () => {
      renderMediaSection();

      for (let i = 0; i < MAX_SCREENSHOT_COUNT; i++) {
        const input = getScreenshotInput();

        const file = createImageFile(`screenshot-${i}.png`);

        selectFile(input, file);
      }

      expect(screen.getAllByAltText("Product Screenshot")).toHaveLength(
        MAX_SCREENSHOT_COUNT,
      );
    });

    it(`${MAX_SCREENSHOT_COUNT}枚になると追加UIが表示されなくなる`, () => {
      renderMediaSection();

      for (let i = 0; i < MAX_SCREENSHOT_COUNT; i++) {
        const input = getScreenshotInput();

        const file = createImageFile(`screenshot-${i}.png`);

        selectFile(input, file);
      }

      expect(
        document.getElementById("productScreenshot"),
      ).not.toBeInTheDocument();
    });

    it("スクリーンショットをクリックするとモーダルが表示される", async () => {
      const user = userEvent.setup();

      renderMediaSection();

      const input = getScreenshotInput();
      const file = createImageFile("screenshot.png");

      selectFile(input, file);

      await user.click(screen.getByAltText("Product Screenshot"));

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("ドラッグアンドドロップで追加できる", () => {
      renderMediaSection();

      const file = createImageFile("screenshot.png");

      const input = getScreenshotInput();
      const dropArea = input.closest("label");

      expect(dropArea).not.toBeNull();

      fireEvent.drop(dropArea!, {
        dataTransfer: {
          files: [file],
        },
      });

      expect(screen.getAllByAltText("Product Screenshot")).toHaveLength(1);
    });
  });
});

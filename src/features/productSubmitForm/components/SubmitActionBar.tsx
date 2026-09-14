"use client";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { ProductSubmitFormInput, ProductSubmitFormValues } from "../schema";

const SubmitActionBar = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<
    ProductSubmitFormInput,
    unknown,
    ProductSubmitFormValues
  >();

  return (
    <div className="fixed bottom-0 left-0 flex justify-between items-center bg-background/90 gap-2 w-full z-10  border-t border-border px-4 sm:px-8 md:px-12 py-4 ">
      <span className="text-muted-foreground text-xs">
        必須項目を入力してください
      </span>
      <div className="flex gap-2">
        <Button variant="outline" type="button">
          TODO:下書き保存
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting && <Spinner className="size-4" />}
          {isSubmitting ? "投稿中..." : "投稿する"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitActionBar;

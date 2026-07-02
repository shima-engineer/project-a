"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  verified?: string;
};

export default function VerifiedToast({ verified }: Props) {
  useEffect(() => {
    if (verified !== "true") return;
    const timerId = setTimeout(() => {
      toast.success("メール認証が完了しました！");
    });

    return () => {
      clearTimeout(timerId);
    };
  }, [verified]);

  return null;
}

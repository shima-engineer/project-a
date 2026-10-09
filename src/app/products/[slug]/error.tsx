"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertCircle className="size-12 text-destructive" />

      <h1 className="text-2xl font-bold">プロダクトの読み込みに失敗しました</h1>

      <p className="text-sm text-muted-foreground">
        一時的なエラーが発生しました。
        <br />
        時間をおいて再度お試しください。
      </p>

      <div className="flex items-center gap-3">
        <Button onClick={() => reset()}>再試行</Button>

        <Button variant="outline" asChild>
          <Link href="/">ホームへ戻る</Link>
        </Button>
      </div>
    </main>
  );
}

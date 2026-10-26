import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <section>
      {/* カバー画像 */}
      <div className="h-28 sm:h-40 rounded-2xl bg-linear-to-br from-hero-start to-hero-end" />

      {/* プロフィール情報 */}
      <div className="flex flex-col mb-4 sm:flex-row sm:items-end md:justify-between gap-4 -mt-10 sm:-mt-14 px-2 sm:px-6">
        <div className="sm:flex sm:items-end sm:gap-4">
          {/* プロフィール画像 */}
          <Skeleton className="size-24 sm:size-32 rounded-2xl ring-4 ring-background shrink-0 mb-4 md:mb-0" />

          {/* 表示名・ユーザー名 */}
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 sm:w-48" />
            <Skeleton className="h-4 w-28 sm:w-36" />
          </div>
        </div>

        {/* プロフィール編集ボタン */}
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* 自己紹介 */}
      <div className="max-w-2xl space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Webサイト・GitHub・X */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="h-5 w-28 rounded-md" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>
    </section>
  );
}

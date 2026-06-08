import Image from "next/image";
import { ArrowRight, ChevronUp } from "lucide-react";

type RankListProps = {
  id: string;
  period: "今日" | "今週" | "今月";
};

const RankList = ({ id, period }: RankListProps) => {
  return (
    <section id={id}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/upIcon.png"
            alt="ランキングのイメージ"
            width={20}
            height={20}
          />
          <h2 className="">{period}のトップ</h2>
        </div>
        <time className="text-xs text-muted-foreground">2026年5月23日</time>
      </div>
      <div className="divide-y divide-border rounded-2xl border border-[#E2E4EA] p-2 mb-3">
        <ul>
          <li className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
            <div className="flex items-center gap-3 sm:gap-4">
              <p className="hidden sm:flex  shrink-0 items-center justify-center text-sm font-semibold text-muted-foreground tabular-nums group-hover/list:text-primary transition-colors">
                1
              </p>
              <Image
                src="/userIcon.png"
                alt="1位"
                width={56}
                height={56}
                className="size-12 sm:size-14 rounded-xl ring-1 ring-border"
              />
              <div>
                <h3 className="font-semibold text-[15px] group-hover/list:text-primary duration-200 transition-colors">
                  Shibuya AI
                </h3>
                <p className="text-sm text-muted-foreground mb-1.5">
                  日本語特化のAIライティングアシスタント
                </p>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/commentIcon.png"
                      alt=""
                      width={12}
                      height={12}
                    />
                    <span className="">86</span>
                  </div>
                  <ul className="flex items-center gap-2 text-xs text-muted-foreground">
                    <li className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                      AI
                    </li>
                    <li className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                      Writing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm bg-background border-border hover:border-upvote hover:text-upvote hover:-translate-y-0.5 hover:shadow-upvote hover:cursor-pointer">
              <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
              <span className="font-bold tabular-nums leading-none mt-0.5">
                1,248
              </span>
            </button>
          </li>
          <li className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
            <div className="flex items-center gap-3 sm:gap-4">
              <p className="hidden sm:flex  shrink-0 items-center justify-center text-sm font-semibold text-muted-foreground tabular-nums group-hover/list:text-primary transition-colors">
                1
              </p>
              <Image
                src="/userIcon.png"
                alt="1位"
                width={56}
                height={56}
                className="size-12 sm:size-14 rounded-xl ring-1 ring-border"
              />
              <div>
                <h3 className="font-semibold text-[15px] group-hover/list:text-primary duration-200 transition-colors">
                  Shibuya AI
                </h3>
                <p className="text-sm text-muted-foreground mb-1.5">
                  日本語特化のAIライティングアシスタント
                </p>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/commentIcon.png"
                      alt=""
                      width={12}
                      height={12}
                    />
                    <span className="">86</span>
                  </div>
                  <ul className="flex items-center gap-2 text-xs text-muted-foreground">
                    <li className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                      AI
                    </li>
                    <li className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                      Writing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm bg-background border-border hover:border-upvote hover:text-upvote hover:-translate-y-0.5 hover:shadow-upvote hover:cursor-pointer">
              <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
              <span className="font-bold tabular-nums leading-none mt-0.5">
                1,248
              </span>
            </button>
          </li>
        </ul>
      </div>
      <button className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
        すべて見る
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  );
};

export default RankList;

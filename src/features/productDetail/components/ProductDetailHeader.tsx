import { ChevronUp } from "lucide-react";

const ProductDetailHeader = () => {
  return (
    <section className="sm:flex justify-between">
      {/* TODO#22:Imageタグに置き換える。 */}
      <div className="sm:flex gap-5">
        <div className="size-20 sm:size-24 rounded-2xl ring-1 ring-border mb-5"></div>
        <div>
          <div className="flex text-xs text-muted-foreground mb-1 ">
            <span>#1</span>
            <span>AI ツール</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
            Shibuya AI
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-5">
            日本語特化のAIライティングアシスタント
          </p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              AI
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              Writing
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              日本語
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              Productivity
            </span>
          </div>
        </div>
      </div>
      <button className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-16 h-16 text-lg hover:-translate-y-0.5 cursor-pointer bg-background border-border hover:border-upvote hover:text-upvote hover:shadow-upvote">
        <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
        <span className="font-bold tabular-nums leading-none mt-0.5">
          1,248
        </span>
      </button>
    </section>
  );
};

export default ProductDetailHeader;

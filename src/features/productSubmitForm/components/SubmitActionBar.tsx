import React from "react";

const SubmitActionBar = () => {
  return (
    <div className="fixed bottom-0 left-0 flex justify-between items-center bg-background/90 w-full z-10  border-t border-border px-4 sm:px-8 md:px-12 py-4 ">
      <span className="text-muted-foreground text-xs">
        必須項目を入力してください
      </span>
      <div className="flex gap-2">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
          下書き保存
        </button>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shadow-[var(--shadow-glow)]">
          投稿する
        </button>
      </div>
    </div>
  );
};

export default SubmitActionBar;

import Link from "next/link";
import React from "react";

const RankTabs = () => {
  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 flex gap-1 overflow-x-auto scrollbar-hide border-b border-gray-200">
      <ul className="flex h-full space-x-4">
        <li className="shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors border-primary text-foreground">
          <Link href="/ranking/today">今日のランキング</Link>
        </li>
        <li className="shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors border-transparent text-muted-foreground hover:text-foreground">
          <Link href="/ranking/week">今週のランキング</Link>
        </li>
        <li className="shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors border-transparent text-muted-foreground hover:text-foreground">
          <Link href="/ranking/month">今月のランキング</Link>
        </li>
      </ul>
    </nav>
  );
};

export default RankTabs;

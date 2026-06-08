"use client";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  { id: "daily", label: "今日のランキング" },
  { id: "weekly", label: "今週のランキング" },
  { id: "monthly", label: "今月のランキング" },
];

const RankTabs = () => {
  const [active, setActive] = useState("daily");

  return (
    <nav className="w-full px-4 flex gap-1 overflow-x-auto scrollbar-hide border-b border-gray-200">
      <ul className="flex h-full space-x-4 w-full max-w-4xl mx-auto px-4">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
              active === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link href={`#${tab.id}`} onClick={() => setActive(tab.id)}>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RankTabs;

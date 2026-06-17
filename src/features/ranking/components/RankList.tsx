"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { RANK_TABS } from "../constants";
import dayjs from "dayjs";
import RankItem from "./RankItem";
import { useState, useTransition } from "react";
import { getProductsByPeriodAction } from "../../product/actions/getProductAction";
import { ProductWithCategory } from "../types";

type RankingPeriodId = (typeof RANK_TABS)[number]["id"];

type RankListProps = {
  id: RankingPeriodId;
  period: "今日" | "今週" | "今月";
  initialProducts: ProductWithCategory[];
  votedProductIds: Set<string>;
};

const RankList = ({
  id,
  period,
  initialProducts,
  votedProductIds,
}: RankListProps) => {
  const [products, setProducts] =
    useState<ProductWithCategory[]>(initialProducts);
  const [isPending, startTransition] = useTransition();

  const handleShowAll = async () => {
    startTransition(async () => {
      const allProducts = await getProductsByPeriodAction(id);
      setProducts(allProducts);
    });
  };

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
          <h2>{period}のトップ</h2>
        </div>
        {id === "daily" && (
          <time
            dateTime={dayjs().format("YYYY-MM-DD")}
            className="text-xs text-muted-foreground"
          >
            {dayjs().format("YYYY年M月D日")}
          </time>
        )}
      </div>
      <div className="divide-y divide-border rounded-2xl border border-border p-2 mb-3">
        <ul>
          {products.map((product, index) => (
            <RankItem
              key={product.id}
              product={product}
              index={index}
              votedProductIds={votedProductIds}
            />
          ))}
        </ul>
      </div>
      {products.length === initialProducts.length && (
        <button
          onClick={handleShowAll}
          disabled={isPending}
          className={`text-sm inline-flex items-center gap-1 ${isPending ? "cursor-default text-muted-foreground" : "cursor-pointer text-muted-foreground hover:text-foreground"}`}
        >
          {isPending ? "読み込み中..." : "すべて見る"}
          {!isPending && <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      )}
    </section>
  );
};

export default RankList;

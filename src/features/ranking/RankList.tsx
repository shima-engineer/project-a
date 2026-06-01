import Image from "next/image";
import React from "react";

const RankList = () => {
  return (
    <section>
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image
          src="/upIcon.png"
          alt="ランキングのイメージ"
          width={20}
          height={20}
          className="mx-auto"
        />
        <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
          本日のトップ
        </h2>
      </div>
    </section>
  );
};

export default RankList;

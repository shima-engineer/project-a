import Image from "next/image";
import React from "react";

const RankList = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/upIcon.png"
            alt="ランキングのイメージ"
            width={20}
            height={20}
          />
          <h2 className="">本日のトップ</h2>
        </div>
        <time className="text-xs text-muted-foreground">2026年5月23日</time>
      </div>
      <div>
        <ul>
            <li>
                <p>1</p>
                <Image src="/userIcon.png" alt="1位" width={56} height={56} />
                <div>
                    <p>Shibuya AI</p>
                    <p>日本語特化のAIライティングアシスタント</p>
                    <div></div>
                </div>
            </li>
        </ul>
      </div>
    
    </section>
  );
};

export default RankList;

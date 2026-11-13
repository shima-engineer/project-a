"use client";

import CATEGORIES from "../constants";
import { Dispatch, SetStateAction } from "react";

interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (nextCategories: string[]) => void;
}

const CategoryFilter = ({
  categories,
  onCategoryChange,
}: CategoryFilterProps) => {
  /**
   * カテゴリ変更時に検索状態を初期化し、
   * 500msのデバウンス後に検索処理を実行する。
   *
   * @param event 入力イベント
   */
  const handleCategoryChange = (label: string) => {
    const nextCategories = categories.includes(label)
      ? categories.filter((item) => item !== label)
      : [...categories, label];

    onCategoryChange(nextCategories);
  };

  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold text-muted-foreground">
        カテゴリー
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <label key={label} className="cursor-pointer">
            <input
              type="checkbox"
              name="category"
              value={label}
              className="peer sr-only"
              onClick={() => handleCategoryChange(label)}
            />
            <span className="flex items-center gap-2 rounded-md border p-3 transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:bg-muted hover:border hover:border-primary">
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CategoryFilter;

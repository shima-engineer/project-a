"use client";

import { Search } from "lucide-react";
import Border from "../../../app/components/elements/Border";

interface SearchInputProps {
  onKeywordChange: (nextKeyword: string) => void;
}

const SearchInput = ({
  onKeywordChange,
}: SearchInputProps) => {

  return (
    <>
      <div className="flex items-center gap-2 mb-4 pr-6 pl-6">
        <Search className="text-primary size-6" />
        <input
          type="search"
          placeholder="プロダクト名、タグ、技術スタックを検索..."
          className="w-full focus:outline-none"
          maxLength={100}
          onChange={(event) => onKeywordChange(event.target.value)}
        />
      </div>
      <Border />
    </>
  );
};

export default SearchInput;

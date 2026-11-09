import { Search } from "lucide-react";
import Border from "../../../app/components/elements/Border";

const SearchInput = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4 pr-6 pl-6">
        <Search className="text-primary size-6" />
        <input
          type="text"
          placeholder="プロダクト名、タグ、技術スタックを検索..."
          className="w-full focus:outline-none"
        />
      </div>
      <Border />
    </>
  );
};

export default SearchInput;

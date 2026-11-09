import { Search } from "lucide-react";

const SearchButton = ({
  handleSearchClick,
}: {
  handleSearchClick: () => void;
}) => {
  return (
    <>
      <button
        type="button"
        aria-label="検索モーダルを開く"
        onClick={handleSearchClick}
        className="cursor-pointer p-2 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Search />
      </button>
      <button
        type="button"
        aria-label="検索モーダルを開く"
        onClick={handleSearchClick}
        className="items-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 ml-auto hidden h-9 flex-1 justify-start gap-2 border-input bg-secondary/60 text-muted-foreground lg:flex max-w-sm"
      >
        <Search />
        <p className="truncate text-xs">プロダクトを検索…</p>
        <kbd className="ml-auto text-[10px]">⌘K</kbd>
      </button>
    </>
  );
};

export default SearchButton;

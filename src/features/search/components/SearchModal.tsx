"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "../../../../components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import SearchFilters from "./SearchFilters";
import SearchResult from "./SearchResult";
import Border from "@/app/components/elements/Border";
import { useState } from "react";
import {
  SearchedProducts,
  countSearchProducts,
} from "../queries/searchProducts";

interface SearchModalProps {
  isSearchModalOpen: boolean;
  onSearchModalClose: () => void;
}

export default function SearchModal({
  isSearchModalOpen,
  onSearchModalClose,
}: SearchModalProps) {
  const [searchedProducts, setSearchedProducts] = useState<SearchedProducts>(
    [],
  );
  const [searchProductsCount, setSearchProductsCount] = useState<number>(0);

  const handleSearchResultsChange = (products: SearchedProducts) => {
    setSearchedProducts(products);
  };

  const handleCountSearchProducts = async (keyword: string) => {
    const count = await countSearchProducts(keyword);
    setSearchProductsCount(count);
  };

  return (
    <Dialog
      open={isSearchModalOpen}
      onOpenChange={(open) => !open && onSearchModalClose()}
    >
      <DialogContent className="sm:max-w-none w-[calc(100%-40px)] p-0 pt-6 pb-6 rounded-xl bg-white text-slate-800 border-none gap-0 max-h-[calc(100dvh-40px)] overflow-y-auto">
        <div className="text-left">
          <DialogHeader>
            <VisuallyHidden.Root>
              <DialogTitle>プロダクトを検索</DialogTitle>
            </VisuallyHidden.Root>
          </DialogHeader>
          <div>
            <div className="mb-4">
              <SearchFilters
                handleSearchResultsChange={handleSearchResultsChange}
                handleCountSearchProducts={handleCountSearchProducts}
              />
            </div>
            <div className="mb-4">
              <Border />
            </div>
            <SearchResult
              searchedProducts={searchedProducts}
              searchProductsCount={searchProductsCount}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

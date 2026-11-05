"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog";

interface SearchModalProps {
  isSearchModalOpen: boolean;
  onSearchModalClose: () => void;
}

export default function SearchModal({
  isSearchModalOpen,
  onSearchModalClose,
}: SearchModalProps) {
  return (
    <Dialog
      open={isSearchModalOpen}
      onOpenChange={(open) => !open && onSearchModalClose()}
    >
      <DialogContent className="sm:max-w-md p-8 rounded-xl bg-white text-slate-800 border-none gap-0">
        <div className="mb-6 text-left">
          <DialogTitle className="text-xl font-bold text-slate-900">
            ProductJPへようこそ
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-500 leading-relaxed">
            投票、コメント、プロダクト投稿にはログインが必要です。
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

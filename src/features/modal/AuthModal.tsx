"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import GoogleAuthButton from "../auth/components/GoogleAuthButton";
import LoginDialog from "../auth/components/LoginDialog";

interface AuthModalProps {
  isAuthModalOpen: boolean;
  onAuthModalClose: () => void;
}

export default function AuthModal({
  isAuthModalOpen,
  onAuthModalClose,
}: AuthModalProps) {
  return (
    <Dialog
      open={isAuthModalOpen}
      onOpenChange={(open) => !open && onAuthModalClose()}
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

        <GoogleAuthButton />

        <div className="relative mb-6 text-center text-xs text-slate-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3">または</span>
        </div>

        <LoginDialog onAuthModalClose={onAuthModalClose} />
      </DialogContent>
    </Dialog>
  );
}

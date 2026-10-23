"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import ProfileAvatarUpload from "./ProfileAvatarUpload";

const ProfileEditModal = ({
  isEditModalOpen,
  onEditModalClose,
}: {
  isEditModalOpen: boolean;
  onEditModalClose: () => void;
}) => {
  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={(open) => !open && onEditModalClose()}
    >
      <DialogContent className="sm:max-w-md p-6 rounded-xl bg-white text-slate-800 border-none gap-0">
        <div className="mb-6 text-left">
          <DialogTitle className="text-lg font-semibold leading-none tracking-tight">
            プロフィールを編集
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-500 leading-relaxed">
            表示名とリンク、自己紹介を設定できます。
          </DialogDescription>
        </div>

        <form className="">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <ProfileAvatarUpload />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="displayName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                表示名 *
              </label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="displayName"
                required
                placeholder="山田 太郎"
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="bio"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                自己紹介
              </label>
              <textarea
                className="flex min-h-15 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="bio"
                placeholder="自己紹介を入力してください"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="website"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Webサイト
              </label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="website"
                placeholder="https://example.com"
                type="url"
              />
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="github"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  GitHub
                </label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="github"
                  placeholder="https://github.com/username"
                  type="url"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="X"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  X (Twitter)
                </label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="X"
                  placeholder="https://twitter.com/username"
                  type="url"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="flex cursor-pointer items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:opacity-80 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex cursor-pointer bg-primary text-primary-foreground items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:opacity-80 transition-colors"
            >
              保存
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;

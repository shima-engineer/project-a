"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { ProfileUser } from "./queries/getUserById";
import ProfileAvatarUpload from "./ProfileAvatarUpload";
import { ProfileEditFormValues } from "./schema/schema";
import ErrorMessage from "@/app/components/elements/ErrorMessage";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileEditFormSchema } from "./schema/schema";

const ProfileEditModal = ({
  isEditModalOpen,
  onEditModalClose,
  profileUser,
}: {
  isEditModalOpen: boolean;
  onEditModalClose: () => void;
  profileUser: ProfileUser;
}) => {
  const methods = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditFormSchema),
    defaultValues: {
      displayName: profileUser.username ?? "",
      bio: profileUser.bio ?? "",
      websiteURL: profileUser.website_url ?? "",
      githubURL: profileUser.github_url ?? "",
      XURL: profileUser.x_url ?? "",
    },
  });

  const handleFormSubmit = (data: ProfileEditFormValues) => {
    console.log(data);
  };

  const handleCancel = () => {
    methods.reset();
    onEditModalClose();
  };

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

        <FormProvider {...methods}>
          <form className="" onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <ProfileAvatarUpload
                  initialAvatarURL={profileUser.avatar_url}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="displayName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  表示名 *
                </label>
                <input
                  {...methods.register("displayName")}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="displayName"
                  required
                  placeholder="山田 太郎"
                />
                <ErrorMessage
                  errorMessage={
                    methods.formState.errors.displayName?.message || ""
                  }
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
                  {...methods.register("bio")}
                  className="flex min-h-15 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="bio"
                  placeholder="自己紹介を入力してください"
                  rows={3}
                />
                <ErrorMessage
                  errorMessage={methods.formState.errors.bio?.message || ""}
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
                  {...methods.register("websiteURL")}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="websiteURL"
                  placeholder="https://example.com"
                  type="url"
                />
                <ErrorMessage
                  errorMessage={
                    methods.formState.errors.websiteURL?.message || ""
                  }
                />
              </div>
              <div className="sm:flex sm:gap-2 mb-4">
                <div className="flex flex-col gap-2 mb-4 sm:mb-0">
                  <label
                    htmlFor="github"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    GitHub
                  </label>
                  <input
                    {...methods.register("githubURL")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="githubURL"
                    placeholder="https://github.com/username"
                    type="url"
                  />
                  <ErrorMessage
                    errorMessage={
                      methods.formState.errors.githubURL?.message || ""
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4 sm:mb-0">
                  <label
                    htmlFor="twitterURL"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    X (Twitter)
                  </label>
                  <input
                    {...methods.register("XURL")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="twitterURL"
                    placeholder="https://twitter.com/username"
                    type="url"
                  />
                  <ErrorMessage
                    errorMessage={methods.formState.errors.XURL?.message || ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
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
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;

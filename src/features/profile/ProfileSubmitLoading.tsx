"use client";

import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "react-hook-form";
import { ProfileEditFormValues } from "./schema/schema";

const ProfileSubmitLoading = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<ProfileEditFormValues>();

  if (!isSubmitting) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 rounded-xl">
      <Spinner className="size-8 text-primary" />
    </div>
  );
};

export default ProfileSubmitLoading;

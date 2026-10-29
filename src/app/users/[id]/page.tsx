import ProfileHeader from "@/features/profile/ProfileHeader";
import ProfileProductList from "@/features/profile/ProfileProductList";
import { notFound } from "next/navigation";
import { getUserById } from "@/features/profile/queries/getUserById";
import { z } from "zod";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // UUID形式が不正なら404
  if (!z.uuid().safeParse(id).success) {
    notFound();
  }

  const [profileUser, currentUser] = await Promise.all([
    getUserById(id),
    getCurrentUser(),
  ]);

  // ユーザーが存在しなければ404
  if (!profileUser) {
    notFound();
  }

  const isOwner = currentUser?.id === profileUser?.id;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 flex-1">
      <div className="mb-8">
        <ProfileHeader profileUser={profileUser} isOwner={isOwner} />
      </div>
      <ProfileProductList
        currentUser={currentUser}
        isOwner={isOwner}
        userId={id}
      />
    </main>
  );
};

export default Page;

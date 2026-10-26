import ProfileHeader from "@/features/profile/ProfileHeader";
import ProfileProductList from "@/features/profile/ProfileProductList";
import { notFound } from "next/navigation";
import { getUserById } from "@/features/profile/queries/getUserById";
import { z } from "zod";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

    // UUID形式が不正なら404
  if (!z.uuid().safeParse(id).success) {
    notFound();
  }
  
  const user = await getUserById(id);
  
  // ユーザーが存在しなければ404
  if (!user) {
    notFound();
  }
  
  console.log(user);
  return (
    <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 flex-1">
      <div className="mb-8">
        <ProfileHeader user={user} />
      </div>
      <ProfileProductList id={id} />
    </main>
  );
};

export default Page;

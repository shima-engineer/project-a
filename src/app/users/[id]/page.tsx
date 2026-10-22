import ProfileHeader from "@/features/profile/ProfileHeader";
import ProfileProductList from "@/features/profile/ProfileProductList";

const page = () => {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 flex-1">
      <div className="mb-8">
        <ProfileHeader />
      </div>
      <ProfileProductList />
    </main>
  );
};

export default page;

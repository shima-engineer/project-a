import ProfileProductItem from "./ProfileProductItem";

const ProfileProductList = () => {
  // TODO:63実際のデータに置き換える
  return (
    <section>
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-base font-semibold ">投稿プロダクト</h2>
        <p className="text-sm font-normal text-muted-foreground tabular-nums">
          4件
        </p>
      </div>
      <ul className="md:grid md:grid-cols-2">
        <ProfileProductItem />
        <ProfileProductItem />
        <ProfileProductItem />
        <ProfileProductItem />
      </ul>
    </section>
  );
};

export default ProfileProductList;

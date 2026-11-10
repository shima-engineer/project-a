import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getUserUpvotes } from "@/features/upvote/queries/getUserUpvotes";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await getCurrentUser();
  // 現在のユーザーが投票した製品の情報を取得
  const upvotes = user ? await getUserUpvotes(user.id) : [];
  // 投票済みの製品IDのセットを作成
  const votedProductIds = new Set(upvotes.map((u) => u.product_id));

  return <HeaderClient user={user} votedProductIds={votedProductIds} />;
};

export default Header;

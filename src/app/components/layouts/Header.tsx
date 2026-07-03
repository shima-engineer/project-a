import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await getCurrentUser();

  return <HeaderClient user={user} />;
};

export default Header;

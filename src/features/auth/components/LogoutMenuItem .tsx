import { logout } from "@/features/auth/actions/logout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const LogoutMenuItem = () => {
  return (
    <form action={logout} className="w-full">
      <DropdownMenuItem
        asChild
        className="w-full cursor-pointer text-left text-destructive hover:bg-gray-100 duration-200"
      >
        <button type="submit" className="w-full text-left">
          ログアウト
        </button>
      </DropdownMenuItem>
    </form>
  );
};

export default LogoutMenuItem;

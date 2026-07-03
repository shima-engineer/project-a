import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileIconDropdownMenu from "@/features/dropdownmenu/ProfileIconDropdownMenu";
import Image from "next/image";

type UserAvatarMenuProps = {
  avatarUrl: string;
  name: string;
  email: string;
};

const UserAvatarMenu = ({ avatarUrl, name, email }: UserAvatarMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <Image
            src={avatarUrl}
            alt="ユーザーのアバター"
            width={38}
            height={38}
            className="rounded-full border border-gray-300 cursor-pointer hover:opacity-80 duration-200"
          />
        </button>
      </DropdownMenuTrigger>

      <ProfileIconDropdownMenu name={name} email={email} />
    </DropdownMenu>
  );
};

export default UserAvatarMenu;

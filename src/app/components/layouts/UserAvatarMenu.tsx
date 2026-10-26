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
  id: string;
};

const UserAvatarMenu = ({ avatarUrl, name, email, id }: UserAvatarMenuProps) => {
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

      <ProfileIconDropdownMenu name={name} email={email} id={id} />
    </DropdownMenu>
  );
};

export default UserAvatarMenu;

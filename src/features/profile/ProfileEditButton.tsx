import { Pencil } from "lucide-react";

const ProfileEditButton = ({handleEditClick}: {handleEditClick: () => void}) => {
  return (
    // TODO:#61 プロフィール編集ボタンの実装
    <button onClick={handleEditClick} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs sm:mb-1 w-full sm:w-auto">
      <Pencil className="lucide lucide-pencil size-3.5 mr-1.5 sm:mr-2" />
      <span>プロフィールを編集</span>
    </button>
  );
};

export default ProfileEditButton;

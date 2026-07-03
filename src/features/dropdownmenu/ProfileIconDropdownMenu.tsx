"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logout } from "../auth/actions/logout";
import Link from "next/link";

type ProfileIconDropdownMenuProps = {
  name: string;
  email: string;
};

export default function ProfileIconDropdownMenu({
  name,
  email,
}: ProfileIconDropdownMenuProps) {
  return (
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {email}
          </span>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="gap-3 hover:bg-gray-100  duration-200 cursor-pointer">
        <Link className="w-full" href="/profile">
          マイプロフィール
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <form action={logout} className="w-full">
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-left text-destructive hover:bg-gray-100 duration-200"
        >
          <button type="submit">ログアウト</button>
        </DropdownMenuItem>
      </form>
    </DropdownMenuContent>
  );
}

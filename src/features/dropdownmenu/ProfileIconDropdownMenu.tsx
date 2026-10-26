"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutMenuItem from "../auth/components/LogoutMenuItem ";

interface ProfileIconDropdownMenuProps {
  name: string;
  email: string;
  id: string;
}

export default function ProfileIconDropdownMenu({
  name,
  email,
  id,
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
        <Link className="w-full" href={`/users/${id}`}>
          マイプロフィール
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <LogoutMenuItem />
    </DropdownMenuContent>
  );
}

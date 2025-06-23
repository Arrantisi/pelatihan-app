"use client";

import {
  IconLogout,
  IconNotification,
  IconUserCircle,
  IconUserCog,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import DialogAccount from "../dialogs/account";
import DialogSettingAccount from "../dialogs/setting";

export function NavUser() {
  const [whichDialog, setWhichDialog] = useState<"account" | "setting" | null>(
    null
  );

  const { data: user } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          redirect("/");
        },
      },
    });
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src="/profile-5.png" alt={user?.user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-10 w-10 rounded-lg">
                <AvatarImage src="/profile-5.png" alt={user?.user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild onClick={() => setWhichDialog("account")}>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild onClick={() => setWhichDialog("setting")}>
              <DropdownMenuItem>
                <IconUserCog />
                Setting
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <IconNotification />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <IconLogout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {whichDialog === "account" ? <DialogAccount /> : <DialogSettingAccount />}
    </Dialog>
  );
}

import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "@/lib/auth-client";

const DialogAccount = () => {
  const { data } = useSession();

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Account</DialogTitle>
        <DialogDescription className="sr-only">
          Ditail akun anda
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col justify-center items-center border-t p-3">
        <Avatar className="size-20 mb-2">
          <AvatarImage src="/profile-5.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="font-semibold capitalize tracking-wide">
          {data?.user.name}
        </h1>
        <h2 className="text-muted-foreground text-sm">{data?.user.email}</h2>
      </div>
    </DialogContent>
  );
};

export default DialogAccount;

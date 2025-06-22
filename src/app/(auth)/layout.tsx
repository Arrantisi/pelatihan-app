import AuthLink from "@/components/form/link-auth";
import { CardDescription } from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div className="flex flex-col items-center gap-2">
        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">Acme Inc.</span>
        </Link>
        <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
        <AuthLink />
      </div>
      <div className="w-full flex justify-center">{children}</div>
      <CardDescription className="max-w-sm text-balance text-center text-xs [&_span]:underline [&_span]:underline-offset-4 [&_span]:hover:text-primary">
        By clicking continue, you agree to our <span>Terms of Service</span> and{" "}
        <span>Privacy Policy</span>.
      </CardDescription>
    </div>
  );
};

export default AuthLayout;

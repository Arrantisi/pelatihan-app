"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLink = () => {
  const pathname = usePathname();

  return (
    <div className="text-center text-sm">
      Don&apos;t have an account?{" "}
      <Link
        href={pathname === "/sign-in" ? "sign-up" : "sign-in"}
        className="underline underline-offset-4"
      >
        {pathname === "/sign-in" ? "sign-up" : "sign-in"}
      </Link>
    </div>
  );
};

export default AuthLink;

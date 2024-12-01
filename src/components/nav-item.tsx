"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem as NavItemProps } from "@/config/site";

export const NavItem = ({ href, label }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={
        pathname === href ? "font-bold text-primary" : "text-muted-foreground"
      }
    >
      {label}
    </Link>
  );
};

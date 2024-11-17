import { UserButton } from "@clerk/nextjs";

import { navItems } from "@/config/site";

import { Logo } from "./logo";
import { NavItem } from "./nav-item";

export const Navbar = () => {
  return (
    <nav className="flex justify-between border-b p-6">
      <div className="flex items-center gap-10">
        <Logo className="text-foreground" width={160} />

        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      <UserButton showName />
    </nav>
  );
};

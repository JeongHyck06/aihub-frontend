import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeaderAuth } from "@/components/common/site-header-auth";
import { SITE_NAVIGATION } from "@/constants/home";
import { cn } from "@/lib/utils";

export type SiteHeaderProps = {
  activeHref?: string;
  rightContent?: ReactNode;
};

export function SiteHeader({ activeHref, rightContent }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e8edf5] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 sm:h-24 lg:px-0">
        <Link
          aria-label="AIHUB 홈"
          className="text-2xl font-extrabold leading-none tracking-tight text-[#0d121a]"
          href="/"
        >
          AIHUB
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-[30px] md:flex">
          {SITE_NAVIGATION.map((item) => (
            <Link
              aria-current={activeHref === item.href ? "page" : undefined}
              className={cn(
                "text-base font-bold leading-5 transition-colors hover:text-blue-600",
                activeHref === item.href
                  ? "font-extrabold text-blue-600"
                  : "text-[#384252]",
              )}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {rightContent ?? <SiteHeaderAuth activeHref={activeHref} />}
      </div>
    </header>
  );
}

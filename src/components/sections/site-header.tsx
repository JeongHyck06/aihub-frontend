import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_NAVIGATION } from "@/constants/home";
import { cn } from "@/lib/utils";

export type SiteHeaderProps = {
  activeHref?: string;
};

export function SiteHeader({ activeHref }: SiteHeaderProps) {
  const isModelRegisterActive = activeHref === "/models/register";

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

        <div className="flex items-center gap-2">
          <Button
            aria-current={isModelRegisterActive ? "page" : undefined}
            aria-label="모델 등록 페이지로 이동"
            className="h-11 px-5"
            href="/models/register"
            variant={isModelRegisterActive ? "primary" : "secondary"}
          >
            모델 등록
          </Button>
          <Button aria-label="로그인 페이지로 이동" className="h-11 px-7" href="/login">
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
}

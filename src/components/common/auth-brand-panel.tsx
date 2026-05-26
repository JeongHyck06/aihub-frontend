import Link from "next/link";
import type { AuthBrandContent } from "@/types/auth";

export type AuthBrandPanelProps = {
  content: AuthBrandContent;
};

export function AuthBrandPanel({ content }: AuthBrandPanelProps) {
  return (
    <aside className="relative hidden min-h-screen w-[560px] shrink-0 overflow-hidden bg-blue-600 px-[60px] py-[60px] text-white lg:flex lg:flex-col">
      <div
        aria-hidden="true"
        className="absolute -right-[120px] -top-[120px] h-[380px] w-[380px] rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-0 -left-20 h-[280px] w-[280px] rounded-full bg-white/10"
      />

      <Link
        aria-label="AIHUB 홈"
        className="relative text-2xl font-extrabold leading-none tracking-tight"
        href="/"
      >
        AIHUB
      </Link>

      <div className="relative mt-[265px]">
        <h1 className="text-5xl font-extrabold leading-[1.22] tracking-tight">
          {content.headline.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>
        <div className="mt-8 space-y-2 text-lg font-medium leading-7 text-white/85">
          {content.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {content.stats ? (
          <dl className="mt-20 grid h-[120px] grid-cols-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-6">
            {content.stats.map((stat, index) => (
              <div
                className="relative"
                key={stat.label}
              >
                {index > 0 ? (
                  <div
                    aria-hidden="true"
                    className="absolute -left-5 top-0 h-[68px] w-px bg-white/20"
                  />
                ) : null}
                <dt className="mt-1 text-[13px] font-medium leading-5 text-white/75">
                  {stat.label}
                </dt>
                <dd className="text-[32px] font-extrabold leading-10">{stat.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <p className="relative mt-auto text-[13px] font-medium leading-5 text-white/60">
        {content.footer}
      </p>
    </aside>
  );
}

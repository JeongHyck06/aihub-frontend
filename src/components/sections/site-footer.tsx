import { FOOTER_LINKS } from "@/constants/home";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e8edf5] bg-white">
      <div className="mx-auto flex min-h-10 w-full max-w-[1200px] flex-col gap-3 px-5 py-3 text-[13px] sm:flex-row sm:items-center sm:justify-between lg:px-0">
        <p className="font-medium leading-5 text-[#8c99ab]">
          © 2026 AIHUB. 안전한 탐색, 언제든 해제 가능
        </p>
        <nav aria-label="푸터 메뉴">
          <ul className="flex flex-wrap gap-3 font-bold leading-5 text-[#384252]">
            {FOOTER_LINKS.map((link, index) => (
              <li className="flex items-center gap-3" key={link}>
                {index > 0 ? (
                  <span aria-hidden="true" className="text-[#8c99ab]">
                    ·
                  </span>
                ) : null}
                <a className="hover:text-blue-600" href={`#${link}`}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

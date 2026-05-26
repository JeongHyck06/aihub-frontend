import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SearchInputProps = {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
};

export function SearchInput({
  id,
  label,
  placeholder,
  className,
}: SearchInputProps) {
  return (
    <form
      action="#"
      className={cn(
        "flex min-h-[72px] w-full flex-col gap-3 rounded-[20px] bg-white p-3 shadow-[0_24px_70px_rgba(0,0,0,0.12)]",
        "sm:flex-row sm:items-center sm:gap-4 sm:py-3 sm:pl-7 sm:pr-3",
        className,
      )}
    >
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="min-h-12 flex-1 bg-transparent text-[17px] font-medium text-slate-900 placeholder:text-[#8c99ab] focus:outline-none"
        name="query"
        placeholder={placeholder}
        type="search"
      />
      {/* TODO: 실제 검색 라우트가 확정되면 form action을 연결합니다. */}
      <Button
        aria-label="AI 서비스 검색"
        className="h-12 rounded-[14px] px-9"
        type="submit"
      >
        검색
      </Button>
    </form>
  );
}

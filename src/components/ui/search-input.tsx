import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SearchInputProps = {
  id: string;
  label: string;
  placeholder: string;
  action?: string;
  buttonClassName?: string;
  className?: string;
  defaultValue?: string;
  inputClassName?: string;
};

export function SearchInput({
  id,
  label,
  placeholder,
  action = "#",
  buttonClassName,
  className,
  defaultValue,
  inputClassName,
}: SearchInputProps) {
  return (
    <form
      action={action}
      className={cn(
        "flex min-h-[72px] w-full flex-col gap-3 rounded-[20px] bg-white p-3 shadow-[0_24px_70px_rgba(0,0,0,0.12)]",
        "sm:flex-row sm:items-center sm:gap-4 sm:py-3 sm:pl-7 sm:pr-3",
        className,
      )}
      method="get"
    >
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "min-h-12 flex-1 bg-transparent text-[17px] font-medium text-slate-900 placeholder:text-[#8c99ab] focus:outline-none",
          inputClassName,
        )}
        defaultValue={defaultValue}
        name="query"
        placeholder={placeholder}
        type="search"
      />
      {/* TODO: 백엔드 검색 API가 준비되면 입력값 기반 필터링을 연결합니다. */}
      <Button
        aria-label="AI 서비스 검색"
        className={cn("h-12 rounded-[14px] px-9", buttonClassName)}
        type="submit"
      >
        검색
      </Button>
    </form>
  );
}

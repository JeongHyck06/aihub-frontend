import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FilterGroup, FilterOption } from "@/types/search";

export type FilterSidebarProps = {
  groups: FilterGroup[];
};

export function FilterSidebar({ groups }: FilterSidebarProps) {
  return (
    <Card className="p-6 lg:min-h-[830px] lg:w-60 lg:shrink-0">
      <form>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold leading-6 text-[#0d121a]">필터</h2>
          <button
            className="text-xs font-bold leading-4 text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            type="reset"
          >
            초기화
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {groups.map((group, index) => (
            <fieldset
              className={cn(index > 0 && "border-t border-[#e8edf5] pt-6")}
              key={group.name}
            >
              <legend className="mb-4 text-[11px] font-extrabold leading-4 text-[#8c99ab]">
                {group.title}
              </legend>
              <div className="space-y-[14px]">
                {group.options.map((option) => (
                  <FilterOptionRow
                    groupName={group.name}
                    key={option.value}
                    option={option}
                    type={group.type}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </form>
    </Card>
  );
}

type FilterOptionRowProps = {
  groupName: string;
  option: FilterOption;
  type: FilterGroup["type"];
};

function FilterOptionRow({ groupName, option, type }: FilterOptionRowProps) {
  const id = `${groupName}-${option.value}`;

  return (
    <label
      className="flex cursor-pointer items-center gap-2 text-[13px] leading-5 text-[#384252]"
      htmlFor={id}
    >
      <input
        className={cn(
          "h-[18px] w-[18px] border-[#e0e5f0] text-blue-600 focus:ring-blue-600",
          type === "checkbox" ? "rounded" : "rounded-full",
        )}
        defaultChecked={option.defaultChecked}
        id={id}
        name={groupName}
        type={type}
        value={option.value}
      />
      <span
        className={cn(
          "flex-1 font-semibold",
          option.defaultChecked && "font-bold text-[#0d121a]",
        )}
      >
        {option.label}
      </span>
      {typeof option.count === "number" ? (
        <span className="text-xs font-semibold leading-4 text-[#8c99ab]">
          {option.count}
        </span>
      ) : null}
    </label>
  );
}

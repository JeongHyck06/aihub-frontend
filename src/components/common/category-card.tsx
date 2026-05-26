import { Card } from "@/components/ui/card";
import type { CategoryItem } from "@/types/home";

export type CategoryCardProps = {
  category: CategoryItem;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group min-h-[120px] p-6 transition-transform hover:-translate-y-1">
      <a
        aria-label={`${category.title} 카테고리의 ${category.serviceCount}개 서비스 보기`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
        href={category.href}
      >
        <h3 className="text-lg font-extrabold leading-6 text-[#0d121a]">
          {category.title}
        </h3>
        <p className="mt-1 text-[13px] font-medium leading-5 text-[#8c99ab]">
          {category.description}
        </p>
        <p className="mt-4 text-[13px] font-extrabold leading-5 text-blue-600">
          {category.serviceCount}개 서비스 →
        </p>
      </a>
    </Card>
  );
}

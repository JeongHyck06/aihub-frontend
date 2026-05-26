import { CategoryCard } from "@/components/common/category-card";
import { SectionHeading } from "@/components/common/section-heading";
import { AI_CATEGORIES, CATEGORY_SECTION } from "@/constants/home";

export function CategorySection() {
  return (
    <section className="bg-[#f8f9fb] py-8 sm:py-10" id="recommend">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <SectionHeading
          description={CATEGORY_SECTION.description}
          title={CATEGORY_SECTION.title}
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AI_CATEGORIES.map((category) => (
            <CategoryCard category={category} key={category.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

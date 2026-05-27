"use client";

import { useEffect, useState } from "react";
import { CategoryCard } from "@/components/common/category-card";
import { SectionHeading } from "@/components/common/section-heading";
import { CATEGORY_SECTION } from "@/constants/home";
import { getCategories } from "@/shared/api";
import type { CategoryItem } from "@/types/home";

export function CategorySection() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((items) => {
        if (!cancelled) setCategories(items);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#f8f9fb] py-8 sm:py-10" id="recommend">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <SectionHeading
          description={CATEGORY_SECTION.description}
          title={CATEGORY_SECTION.title}
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

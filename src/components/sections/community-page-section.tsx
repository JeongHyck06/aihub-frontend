"use client";

import { useMemo, useState } from "react";
import { CommunityPostCard } from "@/components/common/community-post-card";
import { Button } from "@/components/ui/button";
import {
  COMMUNITY_PAGE_CONTENT,
  COMMUNITY_POSTS,
  COMMUNITY_TABS,
} from "@/constants/community";
import { cn } from "@/lib/utils";
import type { CommunityCategory } from "@/types/community";

export function CommunityPageSection() {
  const [activeTab, setActiveTab] = useState<CommunityCategory>("all");
  const posts = COMMUNITY_POSTS;

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") {
      return posts;
    }

    return posts.filter((post) => post.category === activeTab);
  }, [activeTab, posts]);

  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <div aria-hidden="true" className="h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-2.5 text-4xl font-extrabold leading-tight text-[#0d121a]">
          {COMMUNITY_PAGE_CONTENT.title}
        </h1>
        <p className="mt-2 text-[17px] font-medium leading-7 text-[#616e80]">
          {COMMUNITY_PAGE_CONTENT.description}
        </p>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            aria-label="커뮤니티 게시판 필터"
            className="flex min-h-12 w-full max-w-[900px] gap-2 rounded-2xl border border-[#e8edf5] bg-[#f8f9fb] p-2"
            role="tablist"
          >
            {COMMUNITY_TABS.map((tab) => (
              <button
                aria-selected={activeTab === tab.value}
                className={cn(
                  "h-[34px] rounded-[10px] px-6 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                  activeTab === tab.value
                    ? "bg-blue-600 text-white"
                    : "text-[#8c99ab] hover:text-[#384252]",
                )}
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Button
            className="h-12 rounded-[14px] px-8"
            href="/community/write"
          >
            + 글쓰기
          </Button>
        </div>

        <div className="mt-5 space-y-4">
          {filteredPosts.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

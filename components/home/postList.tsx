"use client";

import { useState, useMemo } from "react";
import { PrimaryCategory, SecondaryCategory } from "@/lib/types";
import { dummyPosts } from "@/lib/data/posts";
import PostCard from "@/components/home/postCard";
import PrimaryCategoryFilter from "@/components/home/primaryCategoryFilter";
import SecondaryCategoryFilter from "@/components/home/secondaryCategoryFilter";

export default function PostList() {
  const [primaryCategory, setPrimaryCategory] =
    useState<PrimaryCategory>("all");
  const [selectedSecondaryCategories, setSelectedSecondaryCategories] =
    useState<SecondaryCategory[]>(["all"]);
  const [appliedSecondaryCategories, setAppliedSecondaryCategories] = useState<
    SecondaryCategory[]
  >(["all"]);

  // 필터링된 게시물
  const filteredPosts = useMemo(() => {
    let result = dummyPosts;

    if (primaryCategory === "all") {
      return result;
    } else {
      result = result.filter(
        (post) => post.primaryCategory === primaryCategory
      );
    }

    // 2차 카테고리 필터링 (저장 버튼 클릭 후 적용된 값 사용)
    if (!appliedSecondaryCategories.includes("all")) {
      result = result.filter((post) =>
        appliedSecondaryCategories.includes(post.secondaryCategory)
      );
    }

    return result;
  }, [primaryCategory, appliedSecondaryCategories]);

  // 2차 카테고리 저장 버튼 핸들러
  const handleApplySecondaryCategories = () => {
    setAppliedSecondaryCategories(selectedSecondaryCategories);
  };

  return (
    <section className="w-full">
      {/* 카테고리 필터 */}
      <div className="my-10 flex gap-2.5">
        {/* 1차 카테고리 */}
        <div>
          <PrimaryCategoryFilter
            selectedCategory={primaryCategory}
            onCategoryChange={setPrimaryCategory}
          />
        </div>

        {/* 2차 카테고리 */}
        <div>
          <SecondaryCategoryFilter
            primaryCategory={primaryCategory}
            selectedCategories={selectedSecondaryCategories}
            onCategoriesChange={setSelectedSecondaryCategories}
            onApply={handleApplySecondaryCategories}
          />
        </div>
      </div>

      {/* 게시물 목록 (모바일 1열, 태블릿 2열, PC 3열) */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* 게시물이 없을 때 */}
      {filteredPosts.length === 0 && (
        <div className="flex h-48 items-center justify-center text-center md:h-64">
          <div>
            <p className="text-neutral-60 text-base font-medium md:text-lg">
              게시물이 없습니다
            </p>
            <p className="text-neutral-90 mt-1 text-xs md:mt-2 md:text-sm">
              다른 카테고리를 선택해보세요
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

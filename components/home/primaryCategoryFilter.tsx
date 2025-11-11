"use client";

import { useState, useEffect, useRef } from "react";
import { PrimaryCategory } from "@/lib/types";
import { primaryCategoryLabels } from "@/lib/data/posts";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface PrimaryCategoryFilterProps {
  selectedCategory: PrimaryCategory;
  onCategoryChange: (category: PrimaryCategory) => void;
  className?: string;
}

/**
 * 1차 카테고리 필터 (커스텀 드롭다운)
 * - 전체/일상/Q&A/팁
 * - 단일 선택
 * - 2차 필터와 연동
 */
export default function PrimaryCategoryFilter({
  selectedCategory,
  onCategoryChange,
  className,
}: PrimaryCategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories: PrimaryCategory[] = ["all", "daily", "qna", "tip"];

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (category: PrimaryCategory) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn("relative inline-block w-full md:w-auto", className)}
    >
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "border-surface-stroke text-neutral-0 flex w-40 items-center justify-between rounded-full border bg-neutral-100 px-4 py-3 text-sm font-medium",
          "hover:border-primary-50 focus:border-primary-50 focus:ring-primary-10 focus:ring-2 focus:outline-none",
          "cursor-pointer",
          isOpen && "border-primary-50 ring-primary-10 ring-2"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{primaryCategoryLabels[selectedCategory]}</span>
        <ChevronDown
          className={cn(
            "text-neutral-60 ml-2 h-4 w-4 transition-transform md:h-5 md:w-5",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className={cn(
            "border-surface-stroke absolute z-50 mt-2 rounded-lg border bg-neutral-100 p-1.5 shadow-lg"
          )}
          role="listbox"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className={cn(
                "text-neutral-0 hover:bg-surface-98 w-full rounded-lg px-5 py-2.5 text-left text-sm font-medium transition-colors md:px-4 md:py-3",
                selectedCategory === category &&
                  "bg-primary-90 text-primary-50 font-semibold"
              )}
              role="option"
              aria-selected={selectedCategory === category}
            >
              {primaryCategoryLabels[category]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

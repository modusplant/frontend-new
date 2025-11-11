"use client";

import { useState, useEffect, useRef } from "react";
import {
  PrimaryCategory,
  SecondaryCategory,
  SecondaryCategoryDaily,
  SecondaryCategoryQnA,
} from "@/lib/types";
import {
  secondaryCategoryLabelsDaily,
  secondaryCategoryLabelsQnA,
  secondaryCategoryLabelsTip,
} from "@/lib/data/posts";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SecondaryCategoryFilterProps {
  primaryCategory: PrimaryCategory;
  selectedCategories: SecondaryCategory[];
  onCategoriesChange: (categories: SecondaryCategory[]) => void;
  onApply: () => void;
  className?: string;
}

/**
 * 2차 카테고리 필터 (커스텀 드롭다운 + 칩 형태, 복수 선택)
 * - 1차 카테고리에 따라 동적으로 변경
 * - 초기화 버튼
 * - 저장 버튼
 */
export default function SecondaryCategoryFilter({
  primaryCategory,
  selectedCategories,
  onCategoriesChange,
  onApply,
  className,
}: SecondaryCategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // 1차 카테고리에 따른 2차 카테고리 옵션
  const getSecondaryCategoryOptions = (): {
    value: SecondaryCategory;
    label: string;
  }[] => {
    if (primaryCategory === "all") {
      return [{ value: "all", label: "전체" }];
    }

    if (primaryCategory === "daily") {
      return Object.entries(secondaryCategoryLabelsDaily).map(
        ([value, label]) => ({
          value: value as SecondaryCategoryDaily,
          label,
        })
      );
    }

    if (primaryCategory === "qna" || primaryCategory === "tip") {
      return Object.entries(secondaryCategoryLabelsQnA).map(
        ([value, label]) => ({
          value: value as SecondaryCategoryQnA,
          label,
        })
      );
    }

    return [{ value: "all", label: "전체" }];
  };

  const secondaryOptions = getSecondaryCategoryOptions();

  // 카테고리 토글
  const toggleCategory = (category: SecondaryCategory) => {
    if (category === "all") {
      // 전체 선택
      onCategoriesChange(["all"]);
      return;
    }

    // 전체가 선택되어 있으면 해제하고 현재 카테고리만 선택
    if (selectedCategories.includes("all")) {
      onCategoriesChange([category]);
      return;
    }

    // 이미 선택되어 있으면 제거
    if (selectedCategories.includes(category)) {
      const newCategories = selectedCategories.filter((c) => c !== category);
      // 아무것도 선택되지 않으면 전체 선택
      onCategoriesChange(newCategories.length === 0 ? ["all"] : newCategories);
    } else {
      // 새로운 카테고리 추가
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  // 초기화
  const handleReset = () => {
    onCategoriesChange(["all"]);
  };

  // 1차 카테고리 변경 시 2차 카테고리 자동 초기화
  useEffect(() => {
    onCategoriesChange(["all"]);
  }, [primaryCategory]);

  // 선택된 카테고리 개수 표시
  const getSelectedLabel = () => {
    if (selectedCategories.includes("all")) {
      return "전체";
    }
    const count = selectedCategories.length;
    return `${count}개 선택됨`;
  };

  const handleApplyAndClose = () => {
    onApply();
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
        <span>{getSelectedLabel()}</span>
        <ChevronDown
          className={cn(
            "text-neutral-60 ml-2 h-4 w-4 transition-transform md:h-5 md:w-5",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* 드롭다운 박스 */}
      {isOpen && (
        <div
          className={cn(
            "border-surface-stroke absolute z-50 mt-2 w-sm rounded-lg border bg-neutral-100 p-4 shadow-lg"
          )}
          role="listbox"
        >
          {/* 칩 영역 */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 md:gap-2">
            {secondaryOptions.map((option) => {
              const isSelected = selectedCategories.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleCategory(option.value)}
                  className={cn(
                    "rounded-full px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-all md:px-4 md:py-2 md:text-sm",
                    {
                      "bg-neutral-10 text-neutral-100": isSelected,
                      "border-surface-stroke border bg-neutral-100 text-neutral-50":
                        !isSelected,
                    }
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* 초기화 및 저장 버튼 */}
          <div className="flex items-center justify-end gap-2 font-medium md:gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="border-surface-stroke text-neutral-20 bg-surface-98 rounded-lg border px-4 py-2"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={handleApplyAndClose}
              className="bg-primary-50 rounded-lg px-4 py-2 text-neutral-100"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

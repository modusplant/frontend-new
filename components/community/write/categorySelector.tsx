"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { secondaryCategoriesByPrimary } from "@/lib/constants/categories";

interface CategorySelectorProps {
  primaryCategory: string;
  secondaryCategory: string;
  onPrimaryCategoryChange: (category: string, categoryId: string) => void;
  onSecondaryCategoryChange: (category: string, categoryId: string) => void;
}

// TODO: 실제 API에서 카테고리 목록과 UUID를 가져와야 함
// 임시 하드코딩 (추후 API 연동 필요)
const PRIMARY_CATEGORIES = [
  { id: "148d6e33-102d-4df4-a4d0-5ff233665548", name: "일상" },
  { id: "248d6e33-102d-4df4-a4d0-5ff233665548", name: "Q&A" },
  { id: "348d6e33-102d-4df4-a4d0-5ff233665548", name: "팁" },
];

const SECONDARY_CATEGORIES: Record<string, { id: string; name: string }[]> = {
  일상: [
    { id: "864d6e33-102d-4df4-a4d0-5ff233665548", name: "관엽/야생화" },
    { id: "964d6e33-102d-4df4-a4d0-5ff233665548", name: "제라늄" },
    { id: "a64d6e33-102d-4df4-a4d0-5ff233665548", name: "베고니아" },
    { id: "b64d6e33-102d-4df4-a4d0-5ff233665548", name: "다육/선인장" },
    { id: "c64d6e33-102d-4df4-a4d0-5ff233665548", name: "식충/덩굴/구근" },
    { id: "d64d6e33-102d-4df4-a4d0-5ff233665548", name: "고사리/이끼/수생" },
    { id: "e64d6e33-102d-4df4-a4d0-5ff233665548", name: "베란다/정원" },
    { id: "f64d6e33-102d-4df4-a4d0-5ff233665548", name: "농사/텃밭" },
    { id: "g64d6e33-102d-4df4-a4d0-5ff233665548", name: "식물 쇼핑" },
    { id: "h64d6e33-102d-4df4-a4d0-5ff233665548", name: "기타" },
  ],
  "Q&A": [
    { id: "i64d6e33-102d-4df4-a4d0-5ff233665548", name: "물주기 / 흙" },
    {
      id: "j64d6e33-102d-4df4-a4d0-5ff233665548",
      name: "잎상태 / 성장 / 병충해",
    },
    { id: "k64d6e33-102d-4df4-a4d0-5ff233665548", name: "물꽂이 / 잎꽂이" },
    { id: "l64d6e33-102d-4df4-a4d0-5ff233665548", name: "삽목 / 포기 나누기" },
    { id: "m64d6e33-102d-4df4-a4d0-5ff233665548", name: "분갈이 / 가지치기" },
    { id: "n64d6e33-102d-4df4-a4d0-5ff233665548", name: "월동 / 씨앗" },
    { id: "o64d6e33-102d-4df4-a4d0-5ff233665548", name: "식물 추천 / 품종" },
    { id: "p64d6e33-102d-4df4-a4d0-5ff233665548", name: "기타" },
  ],
  팁: [{ id: "q64d6e33-102d-4df4-a4d0-5ff233665548", name: "전체" }],
};

export default function CategorySelector({
  primaryCategory,
  secondaryCategory,
  onPrimaryCategoryChange,
  onSecondaryCategoryChange,
}: CategorySelectorProps) {
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [secondaryOptions, setSecondaryOptions] = useState<
    { id: string; name: string }[]
  >([]);

  // 1차 카테고리 변경 시 2차 카테고리 옵션 업데이트
  useEffect(() => {
    if (primaryCategory && primaryCategory !== "선택") {
      setSecondaryOptions(SECONDARY_CATEGORIES[primaryCategory] || []);
    } else {
      setSecondaryOptions([]);
    }
  }, [primaryCategory]);

  return (
    <div className="flex items-center gap-2.5">
      {/* 1차 카테고리 드롭다운 */}
      <div className="relative">
        <button
          onClick={() => setIsPrimaryOpen(!isPrimaryOpen)}
          className="border-surface-stroke flex h-11 w-60 items-center justify-between gap-2 rounded-lg border px-4.5 py-2.5"
        >
          <span
            className={`text-[15px] leading-normal font-medium tracking-[-0.01em] ${
              primaryCategory && primaryCategory !== "선택"
                ? "text-neutral-20"
                : "text-neutral-60"
            }`}
          >
            {primaryCategory || "주제를 선택해주세요(필수)"}
          </span>
          <ChevronDown className="text-neutral-70 h-3.5 w-3.5" />
        </button>

        {isPrimaryOpen && (
          <div className="border-surface-stroke absolute top-12 left-0 z-10 w-60 rounded-lg border bg-white shadow-lg">
            {PRIMARY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onPrimaryCategoryChange(category.name, category.id);
                  setIsPrimaryOpen(false);
                  // 1차 변경 시 2차 초기화
                  onSecondaryCategoryChange("", "");
                }}
                className="text-neutral-20 hover:bg-surface-98 block w-full px-4 py-2.5 text-left text-[15px] leading-normal font-medium tracking-[-0.01em] transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2차 카테고리 드롭다운 */}
      <div className="relative">
        <button
          onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
          disabled={!primaryCategory || primaryCategory === "선택"}
          className="border-surface-stroke flex h-11 w-60 items-center justify-between gap-2 rounded-lg border px-4.5 py-2.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span
            className={`text-[15px] leading-normal font-medium tracking-[-0.01em] ${
              secondaryCategory && secondaryCategory !== "선택"
                ? "text-neutral-20"
                : "text-neutral-60"
            }`}
          >
            {secondaryCategory || "세부 주제를 선택해주세요(필수)"}
          </span>
          <ChevronDown className="text-neutral-70 h-3.5 w-3.5" />
        </button>

        {isSecondaryOpen && secondaryOptions.length > 0 && (
          <div className="border-surface-stroke absolute top-12 left-0 z-10 w-60 rounded-lg border bg-white shadow-lg">
            {secondaryOptions.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSecondaryCategoryChange(category.name, category.id);
                  setIsSecondaryOpen(false);
                }}
                className="text-neutral-20 hover:bg-surface-98 block w-full px-4 py-2.5 text-left text-[15px] leading-normal font-medium tracking-[-0.01em] transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

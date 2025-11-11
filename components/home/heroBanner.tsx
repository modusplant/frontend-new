"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Pause, ChevronLeft, ChevronRight, Play, Square } from "lucide-react";

export interface HeroBannerProps {
  images?: string[];
  autoPlayInterval?: number; // 밀리초 단위 (기본 3000ms = 3초)
  className?: string;
}

/**
 * 메인페이지 히어로 배너 (자동 슬라이드)
 * - 3개 이미지 자동 재생 (3초 간격)
 * - 좌우 화살표 네비게이션
 * - 루프 슬라이더
 */
export default function HeroBanner({
  images = ["/banner/ban_01.png", "/banner/ban_02.png", "/banner/ban_01.png"],
  autoPlayInterval = 3000,
  className,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 다음 슬라이드로 이동
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // 이전 슬라이드로 이동
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // 특정 슬라이드로 이동
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 재생/일시정지 토글
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // 자동 재생
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, handleNext, autoPlayInterval, currentIndex]);

  return (
    <section
      className={cn(
        "bg-surface-98 relative h-[20vh] w-full overflow-hidden md:h-[30vh] lg:h-[45vh]",
        className
      )}
    >
      {/* 슬라이드 이미지 */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image}
              alt={`히어로 이미지 ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* 네비게이션 컨트롤 */}
      <div className="absolute right-1/5 bottom-4 z-10 flex gap-2">
        {/* 재생/일시중지 */}
        <button
          onClick={togglePlayPause}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 transition-colors hover:bg-black/80"
          aria-label={isPlaying ? "일시정지" : "재생"}
        >
          {isPlaying ? (
            <Square color="white" size={18} />
          ) : (
            <Play color="white" size={18} />
          )}
        </button>

        {/* 좌우 화살표 및 인덱스 */}
        <div className="flex h-8 w-22 items-center justify-between rounded-full bg-black/60 px-1 text-white">
          <button
            onClick={handlePrev}
            className="transition-opacity hover:opacity-80"
            aria-label="이전 슬라이드"
          >
            <ChevronLeft color="white" size={20} />
          </button>
          <span>{currentIndex + 1}</span>
          <span className="opacity-50">| {images.length}</span>
          <button
            onClick={handleNext}
            className="transition-opacity hover:opacity-80"
            aria-label="다음 슬라이드"
          >
            <ChevronRight color="white" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

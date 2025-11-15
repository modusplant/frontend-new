"use client";

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/types";
import Badge from "@/components/_common/badge";
import {
  secondaryCategoryLabelsDaily,
  secondaryCategoryLabelsQnA,
} from "@/lib/data/posts";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Bookmark, Heart, MessageSquare } from "lucide-react";

export interface PostCardProps {
  post: Post;
  className?: string;
}

/**
 * 게시글 카드 컴포넌트
 * - 제목, 이미지(썸네일), 북마크 아이콘, 좋아요/댓글 수
 * - 2차 카테고리, 본문 일부(말줄임표), 업로드 일자, 닉네임
 */
export default function PostCard({ post, className }: PostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  // 날짜 포맷팅
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(post.createdAt);

  // 2차 카테고리 라벨 가져오기
  const getSecondaryCategoryLabel = () => {
    if (post.primaryCategory === "daily") {
      return secondaryCategoryLabelsDaily[
        post.secondaryCategory as keyof typeof secondaryCategoryLabelsDaily
      ];
    }
    if (post.primaryCategory === "qna") {
      return secondaryCategoryLabelsQnA[
        post.secondaryCategory as keyof typeof secondaryCategoryLabelsQnA
      ];
    }
    return "전체";
  };

  // 북마크 토글 (실제로는 API 호출)
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 동작 방지
    setIsBookmarked(!isBookmarked);
    // TODO: API 호출
  };

  // 기본 이미지 (게시글에 이미지 없는 경우)
  const defaultThumbnail = "/images/default-plant.jpg";

  return (
    <Link
      href={`/community/${post.id}`}
      className={cn("group block overflow-hidden", className)}
    >
      {/* 썸네일 이미지 */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={post.thumbnail || defaultThumbnail}
          alt={post.title}
          fill
          className="rounded-xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mt-5 flex flex-col gap-3.5">
        {/* 2차 카테고리 배지 */}
        <div>
          <Badge
            variant="outline"
            size="md"
            className="bg-surface-98 font-medium"
          >
            {getSecondaryCategoryLabel()}
          </Badge>
        </div>

        <div className="flex flex-col gap-1.5">
          {/* 제목 */}
          <h3 className="text-neutral-20 group-hover:text-primary-50 line-clamp-1 text-lg font-semibold md:text-[17px]">
            {post.title}
          </h3>

          {/* 본문 일부 (말줄임표) */}
          {post.excerpt && (
            <p className="text-neutral-40 line-clamp-2 text-sm md:min-h-10 lg:min-h-10">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* 메타 정보 */}
        <div className="text-neutral-60 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {/* 작성자 / 통계 (좋아요, 댓글) / 날짜 */}
            <span className="text-neutral-60 max-w-20">
              {post.author.nickname}
            </span>
            <span className="flex items-center gap-1">
              <Heart
                className="md:h-4 md:w-4"
                color="red"
                fill="red"
                // stroke={post.likes > 0 ? "currentColor" : "none"}
                // fill={post.likes > 0 ? "currentColor" : "none"}
              />
              <span>{post.likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="md:h-4 md:w-4" />
              <span>{post.commentCount}</span>
            </span>
            <Bookmark
              fill={isBookmarked ? "currentColor" : "none"}
              className={cn(
                "md:h-5 md:w-5",
                isBookmarked ? "text-primary-50" : "text-neutral-60"
              )}
            />
          </div>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

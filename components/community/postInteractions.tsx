"use client";

import { Heart, Bookmark } from "lucide-react";
import { usePostInteraction } from "@/lib/hooks/community/usePostInteraction";

interface PostInteractionsProps {
  postId: string;
  initialLikeCount: number;
  initialBookmarkCount: number;
  initialIsLiked?: boolean;
  initialIsBookmarked?: boolean;
}

export default function PostInteractions({
  postId,
  initialLikeCount,
  initialBookmarkCount,
  initialIsLiked = false,
  initialIsBookmarked = false,
}: PostInteractionsProps) {
  const {
    likeCount,
    isLiked,
    isLiking,
    handleLike,
    bookmarkCount,
    isBookmarked,
    isBookmarking,
    handleBookmark,
  } = usePostInteraction({
    postId,
    initialLikeCount,
    initialBookmarkCount,
    initialIsLiked,
    initialIsBookmarked,
  });

  return (
    <div className="flex items-center gap-4">
      {/* 좋아요 버튼 */}
      <button
        onClick={handleLike}
        disabled={isLiking}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
          isLiked
            ? "border-primary-50 bg-primary-10 text-primary-50"
            : "border-neutral-90 text-neutral-60 hover:border-primary-50 hover:text-primary-50"
        }`}
      >
        <Heart
          className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
          strokeWidth={2}
        />
        <span>{likeCount.toLocaleString()}</span>
      </button>

      {/* 북마크 버튼 */}
      <button
        onClick={handleBookmark}
        disabled={isBookmarking}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
          isBookmarked
            ? "border-primary-50 bg-primary-10 text-primary-50"
            : "border-neutral-90 text-neutral-60 hover:border-primary-50 hover:text-primary-50"
        }`}
      >
        <Bookmark
          className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
          strokeWidth={2}
        />
        <span>{bookmarkCount.toLocaleString()}</span>
      </button>
    </div>
  );
}

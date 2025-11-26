"use client";

import { useState, useEffect } from "react";
import { commentApi } from "@/lib/api/comment";
import { Comment } from "@/lib/types";
import { buildCommentTree } from "@/lib/utils/parseComments";
import CommentList from "./commentList";
import CommentForm from "./commentForm";
import { dummyComments } from "@/lib/data/postDetail";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 댓글 목록 조회
  const fetchComments = async () => {
    try {
      const response = await commentApi.getComments(postId);
      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("댓글 조회 실패:", error);
      const response = { data: dummyComments };
      setComments(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 플랫 배열 → 트리 구조 변환
  const commentTree = buildCommentTree(comments);

  return (
    <div className="border-surface-stroke mt-16 border-t pt-12">
      <h2 className="font-nanum text-neutral-0 mb-8 text-[34px] font-semibold">
        댓글 {comments.length.toLocaleString()}개
      </h2>

      {/* 댓글 작성 폼 */}
      <CommentForm
        postId={postId}
        onSuccess={fetchComments}
        currentCommentCount={comments.length}
      />

      {/* 댓글 목록 */}
      {isLoading ? (
        <div className="text-neutral-60 py-12 text-center">
          댓글을 불러오는 중...
        </div>
      ) : commentTree.length === 0 ? (
        <div className="text-neutral-60 py-12 text-center">
          첫 댓글을 작성해보세요!
        </div>
      ) : (
        <CommentList
          comments={commentTree}
          postId={postId}
          onUpdate={fetchComments}
        />
      )}
    </div>
  );
}

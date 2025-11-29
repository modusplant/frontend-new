"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PostWriteHeader from "@/components/community/write/postWriteHeader";
import CategorySelector from "@/components/community/write/categorySelector";
import TitleInput from "@/components/community/write/titleInput";
import ContentEditor from "@/components/community/write/contentEditor";
import PostWriteActions from "@/components/community/write/postWriteActions";
import usePostWrite from "@/lib/hooks/community/usePostWrite";
import { postApi } from "@/lib/api/post";

export default function PostWritePage() {
  const params = useParams();
  const mode = params.mode as string[] | undefined;

  // 수정 모드 확인 (URL: /community/write/edit/[postId])
  const isEditMode = mode?.[0] === "edit";
  const postId = isEditMode ? mode[1] : undefined;

  // 폼 상태
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [primaryCategoryId, setPrimaryCategoryId] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");
  const [secondaryCategoryId, setSecondaryCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  // 수정 모드일 경우 기존 데이터 로드
  const { data: existingPost } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postApi.getPostDetail(postId!),
    enabled: isEditMode && !!postId,
  });

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (existingPost?.data) {
      const post = existingPost.data;
      setTitle(post.title);
      // TODO: primaryCategory, secondaryCategory는 API 응답에서 UUID를 가져와야 함
      // 지금은 문자열로만 제공되므로 임시 처리
      setPrimaryCategory(post.primaryCategory);
      setSecondaryCategory(post.secondaryCategory);

      // 텍스트 콘텐츠 추출
      const textParts = post.content
        .filter((c) => c.type === "text")
        .map((c) => c.data)
        .join("\n\n");
      setTextContent(textParts);

      // 이미지는 base64이므로 File로 변환할 수 없음
      // 수정 시 새로 업로드하도록 유도 (기획서에서 명확하지 않음)
    }
  }, [existingPost]);

  // 커스텀 훅
  const {
    isEditMode: hookIsEditMode,
    isSubmitting,
    handleSubmit,
  } = usePostWrite(postId);

  // 폼 유효성 검증
  const isFormValid =
    primaryCategoryId.trim() !== "" &&
    secondaryCategoryId.trim() !== "" &&
    title.trim() !== "" &&
    title.length <= 60 &&
    (textContent.trim() !== "" || images.length > 0);

  // 제출 핸들러
  const onSubmit = () => {
    if (!isFormValid || isSubmitting) return;

    handleSubmit({
      primaryCategoryId,
      secondaryCategoryId,
      title: title.trim(),
      textContent: textContent.trim(),
      images,
    });
  };

  return (
    <div className="mx-auto flex min-h-screen w-[848px] flex-col gap-5 px-10 py-5">
      {/* 헤더 */}
      <PostWriteHeader isEditMode={hookIsEditMode} />

      {/* 메인 폼 */}
      <div className="flex flex-1 flex-col gap-4 self-stretch">
        {/* 카테고리 선택 */}
        <CategorySelector
          primaryCategory={primaryCategory}
          secondaryCategory={secondaryCategory}
          onPrimaryCategoryChange={(name, id) => {
            setPrimaryCategory(name);
            setPrimaryCategoryId(id);
          }}
          onSecondaryCategoryChange={(name, id) => {
            setSecondaryCategory(name);
            setSecondaryCategoryId(id);
          }}
        />

        {/* 제목 입력 */}
        <TitleInput value={title} onChange={setTitle} />

        {/* 본문 에디터 */}
        <ContentEditor
          textContent={textContent}
          images={images}
          onTextChange={setTextContent}
          onImagesChange={setImages}
        />

        {/* 액션 버튼 */}
        <PostWriteActions
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          onSubmit={onSubmit}
          isEditMode={hookIsEditMode}
        />
      </div>
    </div>
  );
}

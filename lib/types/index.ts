/**
 * 1차 카테고리 타입
 */
export type PrimaryCategory = "all" | "daily" | "qna" | "tip";

/**
 * 2차 카테고리 타입 (1차 카테고리별)
 */
export type SecondaryCategoryDaily =
  | "all"
  | "foliage-wildflower"
  | "geranium"
  | "begonia"
  | "succulent-cactus"
  | "carnivorous-vine-bulb"
  | "fern-moss-aquatic"
  | "veranda-garden"
  | "farm-vegetable"
  | "plant-shopping"
  | "etc";

export type SecondaryCategoryQnA =
  | "all"
  | "watering-soil"
  | "leaf-growth-pest"
  | "water-leaf-cutting"
  | "cutting-division"
  | "repotting-pruning"
  | "overwintering-seed"
  | "plant-recommend"
  | "etc";

export type SecondaryCategoryTip = "all";

export type SecondaryCategory =
  | SecondaryCategoryDaily
  | SecondaryCategoryQnA
  | SecondaryCategoryTip;

/**
 * 콘텐츠 타입 (멀티파트)
 */
export interface ContentPart {
  type: "text" | "image" | "video" | "audio" | "file";
  order: number;
  filename: string;
  data: string; // 텍스트는 문자열, 파일은 URL
}

/**
 * 게시물 타입
 */
export interface Post {
  id: string;
  primaryCategoryId: string; // UUID
  secondaryCategoryId: string; // UUID
  primaryCategory: PrimaryCategory;
  secondaryCategory: SecondaryCategory;
  title: string;
  content: ContentPart[]; // 멀티파트 콘텐츠
  excerpt?: string; // 본문 요약 (말줄임표 사용)
  author: {
    id: string;
    nickname: string; // name -> nickname
    avatar?: string;
  };
  thumbnail?: string; // 썸네일 이미지 (없으면 기본 이미지)
  createdAt: Date;
  updatedAt?: Date;
  views?: number; // 조회수 (선택)
  likes: number; // 좋아요 수
  commentCount: number; // 댓글 수
  isBookmarked: boolean; // 북마크 여부
  isPublished: boolean; // 게시/임시저장
}

/**
 * 댓글 타입
 */
export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  parentId?: string; // 대댓글인 경우 부모 댓글 ID
  replies?: Comment[]; // 대댓글 목록
}

/**
 * 사용자 타입
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

/**
 * 회원가입 폼 데이터 타입
 */
export interface SignupFormData {
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToCommunity: boolean;
}

/**
 * 이메일 인증 상태 타입
 */
export interface EmailVerificationState {
  isCodeSent: boolean;
  isVerified: boolean;
  timeRemaining: number; // 초 단위
  canResend: boolean;
}

/**
 * 닉네임 검증 상태 타입
 */
export interface NicknameVerificationState {
  isChecked: boolean;
  isAvailable: boolean;
  message: string;
}

/**
 * 회원가입 API 응답 타입
 */
export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
}

/**
 * 이메일 인증 요청 응답 타입
 */
export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  expiresIn?: number; // 만료 시간(초)
}

/**
 * 인증코드 확인 응답 타입
 */
export interface VerificationCodeResponse {
  success: boolean;
  message: string;
}

/**
 * 닉네임 중복 확인 응답 타입
 */
export interface NicknameCheckResponse {
  success: boolean;
  available: boolean;
  message: string;
}

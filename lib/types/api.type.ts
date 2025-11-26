/**
 * API 공통 응답 구조
 */
export interface ApiResponse<T = any> {
  status: number;
  code: string;
  message: string;
  data?: T;
}

/**
 * API 에러
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * 로그인 요청 데이터
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답 데이터
 */
export interface LoginResponseData {
  accessToken: string;
}

/**
 * 이메일 인증 요청 데이터
 */
export interface EmailVerificationRequest {
  email: string;
}

/**
 * 이메일 인증 응답 데이터
 */
export interface EmailVerificationResponseData {
  hasEmailAuth: boolean;
}

/**
 * 이메일 인증 확인 요청 데이터
 */
export interface EmailVerifyRequest {
  email: string;
  verifyCode: string;
}

/**
 * 닉네임 중복 확인 응답 데이터
 */
export interface NicknameCheckResponseData {
  isNicknameExisted: boolean;
}

/**
 * 회원가입 요청 데이터
 */
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  agreedTermsOfUseVersion: string;
  agreedPrivacyPolicyVersion: string;
  agreedAdInfoReceivingVersion: string;
}

/**
 * 사용자 인증 정보 응답 데이터
 */
export interface UserAuthInfoResponseData {
  id: string;
  email: string;
  provider: string;
}

/**
 * 게시글 콘텐츠 파트
 */
export interface PostContentPart {
  type: "text" | "image" | "video" | "audio" | "file";
  order: number;
  filename: string;
  data: string;
}

/**
 * 게시글 목록 조회 요청 파라미터
 */
export interface GetPostsRequest {
  lastPostId?: string; // 커서 기반 페이지네이션
  size: number; // 페이지 크기
  primaryCategoryId?: string; // UUID
  secondaryCategoryId?: string; // UUID (쉼표로 구분하여 여러 개 가능)
}

/**
 * 게시글 목록 응답 데이터 (개별 게시글)
 */
export interface PostData {
  postId: string;
  primaryCategory: string; // "일상", "Q&A", "팁"
  secondaryCategory: string; // "관엽/야생화", "기타" 등
  nickname: string;
  title: string;
  content: PostContentPart[]; // 첫 번째 텍스트와 이미지만
  likeCount: number;
  publishedAt: string; // ISO 8601 형식
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

/**
 * 게시글 목록 조회 응답 데이터
 */
export interface GetPostsResponseData {
  posts: PostData[];
  nextPostId: string | null;
  hasNext: boolean;
  size: number;
}

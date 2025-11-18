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

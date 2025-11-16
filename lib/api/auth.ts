import {
  SignupResponse,
  EmailVerificationResponse,
  VerificationCodeResponse,
  NicknameCheckResponse,
} from "@/lib/types";

/**
 * API 응답 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * 기본 API 호출 함수
 */
async function apiCall<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || "API 호출에 실패했습니다",
        response.status,
        data.code
      );
    }

    return {
      success: true,
      data,
      message: data.message,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("네트워크 오류가 발생했습니다");
  }
}

// ===========================================
// 실제 API 함수들 (백엔드 연동 시 사용)
// ===========================================

/**
 * 이메일 인증 요청
 */
export async function requestEmailVerification(
  email: string
): Promise<EmailVerificationResponse> {
  const response = await apiCall<EmailVerificationResponse>(
    "/api/auth/email/request",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    }
  );

  return response.data!;
}

/**
 * 인증코드 확인
 */
export async function verifyEmailCode(
  email: string,
  code: string
): Promise<VerificationCodeResponse> {
  const response = await apiCall<VerificationCodeResponse>(
    "/api/auth/email/verify",
    {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }
  );

  return response.data!;
}

/**
 * 닉네임 중복 확인
 */
export async function checkNickname(
  nickname: string
): Promise<NicknameCheckResponse> {
  const response = await apiCall<NicknameCheckResponse>(
    `/api/auth/nickname/check?nickname=${encodeURIComponent(nickname)}`,
    {
      method: "GET",
    }
  );

  return response.data!;
}

/**
 * 회원가입
 */
export async function signup(data: {
  email: string;
  password: string;
  nickname: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToCommunity: boolean;
}): Promise<SignupResponse> {
  const response = await apiCall<SignupResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.data!;
}

/**
 * 로그인
 */
export async function login(data: {
  email: string;
  password: string;
  rememberMe?: boolean;
}): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
  token?: string;
}> {
  const response = await apiCall<{
    user?: {
      id: string;
      email: string;
      nickname: string;
    };
    token?: string;
  }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return {
    success: response.success,
    user: response.data?.user,
    token: response.data?.token,
  };
}

// ===========================================
// 모킹 함수들 (개발/테스트 시 사용)
// ===========================================

/**
 * 이메일 인증 요청 (모킹)
 */
export async function requestEmailVerificationMock(
  email: string
): Promise<EmailVerificationResponse> {
  // 시뮬레이션 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 특정 이메일에 대한 실패 시뮬레이션
  if (email === "fail@test.com") {
    return {
      success: false,
      message: "이미 가입된 이메일입니다.",
    };
  }

  return {
    success: true,
    message: "인증코드가 발송되었습니다.",
    expiresIn: 180,
  };
}

/**
 * 인증코드 확인 (모킹)
 */
export async function verifyEmailCodeMock(
  email: string,
  code: string
): Promise<VerificationCodeResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 인증코드 "123456"만 성공
  if (code === "123456") {
    return {
      success: true,
      message: "이메일 인증이 완료되었습니다.",
    };
  }

  return {
    success: false,
    message: "인증코드가 일치하지 않습니다.",
  };
}

/**
 * 닉네임 중복 확인 (모킹)
 */
export async function checkNicknameMock(
  nickname: string
): Promise<NicknameCheckResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const unavailableNicknames = ["admin", "test", "모두의식물", "modusplant"];
  const isUnavailable = unavailableNicknames.includes(nickname.toLowerCase());

  return {
    success: true,
    available: !isUnavailable,
    message: isUnavailable
      ? "사용 중인 닉네임입니다."
      : "사용 가능한 닉네임입니다.",
  };
}

/**
 * 회원가입 (모킹)
 */
export async function signupMock(data: {
  email: string;
  password: string;
  nickname: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}): Promise<SignupResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 특정 이메일에 대한 실패 시뮬레이션
  if (data.email === "exists@test.com") {
    return {
      success: false,
      message: "이미 가입된 이메일입니다.",
    };
  }

  return {
    success: true,
    message: "회원가입이 완료되었습니다.",
    user: {
      id: `user_${Date.now()}`,
      email: data.email,
      nickname: data.nickname,
    },
  };
}

/**
 * 로그인 (모킹)
 */
export async function loginMock(data: {
  email: string;
  password: string;
  rememberMe?: boolean;
}): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
  token?: string;
  message?: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 테스트 계정
  const testAccount = {
    email: "test@modusplant.com",
    password: "Test123!",
    user: {
      id: "user_test",
      email: "test@modusplant.com",
      nickname: "테스트유저",
    },
  };

  if (
    data.email === testAccount.email &&
    data.password === testAccount.password
  ) {
    return {
      success: true,
      user: testAccount.user,
      token: "mock_jwt_token",
    };
  }

  return {
    success: false,
    message: "이메일 또는 비밀번호가 올바르지 않습니다.",
  };
}

// ===========================================
// 개발 환경에 따른 API 선택
// ===========================================

const isDevelopment = process.env.NODE_ENV === "development";
const useMockApi =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true" || isDevelopment;

export const authApi = {
  // 사용할 API 함수들 (환경에 따라 실제/모킹 선택)
  requestEmailVerification: useMockApi
    ? requestEmailVerificationMock
    : requestEmailVerification,
  verifyEmailCode: useMockApi ? verifyEmailCodeMock : verifyEmailCode,
  checkNickname: useMockApi ? checkNicknameMock : checkNickname,
  signup: useMockApi ? signupMock : signup,
  login: useMockApi ? loginMock : login,

  // 개발용 직접 접근
  mock: {
    requestEmailVerification: requestEmailVerificationMock,
    verifyEmailCode: verifyEmailCodeMock,
    checkNickname: checkNicknameMock,
    signup: signupMock,
    login: loginMock,
  },

  // 실제 API 직접 접근
  real: {
    requestEmailVerification,
    verifyEmailCode,
    checkNickname,
    signup,
    login,
  },
};

import { create } from "zustand";
import { persist } from "zustand/middleware";

// 인증 상태 타입 정의
export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginAttempts: number;
  lastLoginAttempt: number | null;
}

interface AuthActions {
  login: (user: User, rememberMe?: boolean) => void;
  logout: () => void;
  incrementLoginAttempts: () => void;
  resetLoginAttempts: () => void;
  isLoginBlocked: () => boolean;
}

export type AuthStore = AuthState & AuthActions;

// Zustand store 생성
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      isAuthenticated: false,
      loginAttempts: 0,
      lastLoginAttempt: null,

      // 액션들
      login: (user: User, rememberMe = false) => {
        set({
          user,
          isAuthenticated: true,
          loginAttempts: 0, // 성공 시 시도 횟수 초기화
          lastLoginAttempt: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          loginAttempts: 0,
          lastLoginAttempt: null,
        });
      },

      incrementLoginAttempts: () => {
        set((state) => ({
          loginAttempts: state.loginAttempts + 1,
          lastLoginAttempt: Date.now(),
        }));
      },

      resetLoginAttempts: () => {
        set({
          loginAttempts: 0,
          lastLoginAttempt: null,
        });
      },

      isLoginBlocked: () => {
        const state = get();
        // 현재는 차단 로직 없음 (시간 제한 없음)
        // 필요시 여기에 시간 기반 차단 로직 추가
        return false;
      },
    }),
    {
      name: "auth-storage", // localStorage 키
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // 로그인 시도 관련은 세션에서만 유지하고 persist하지 않음
      }),
    }
  )
);

// 더미 API 함수들 (실제 API 구현 시 대체)
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User }> => {
    // 인위적인 지연 (실제 API 호출 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 더미 유저 검증
    if (email === "notfound@example.com") {
      throw new Error("존재하지 않는 이메일입니다.");
    }

    if (password !== "password123") {
      throw new Error("비밀번호가 올바르지 않습니다.");
    }

    // 성공 시 더미 유저 반환
    return {
      user: {
        id: "1",
        email,
        name: "테스트 사용자",
      },
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

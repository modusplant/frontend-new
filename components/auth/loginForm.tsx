"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/_common/input";
import { Checkbox } from "@/components/_common/checkbox";
import { Button } from "@/components/_common/button";
import { useAuthStore, authAPI } from "@/lib/store/authStore";

// 유효성 검사 스키마
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "비밀번호는 8자 이상이어야 합니다"),
  rememberMe: z.boolean().default(true),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  className?: string;
}

export default function LoginForm({ className }: LoginFormProps) {
  const router = useRouter();
  const { login, loginAttempts, incrementLoginAttempts } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);

      // API 호출
      const response = await authAPI.login(data.email, data.password);

      // Zustand store 업데이트
      login(response.user, data.rememberMe);

      // 로그인 성공 시 메인페이지로 리다이렉트
      console.log("로그인 성공:", response.user);
      router.push("/");
    } catch (error) {
      // 로그인 시도 횟수 증가
      incrementLoginAttempts();

      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="space-y-8">
        {/* 입력 필드 영역 */}
        <div className="space-y-2.5">
          {/* 이메일/비밀번호 통합 입력 필드 */}
          <div className="border-surface-stroke-2 overflow-hidden rounded-lg border">
            {/* 이메일 입력 필드 */}
            <Input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              className="border-0 p-3 px-4.5 focus:ring-0"
            />
            {/* 구분선 */}
            <hr className="border-surface-stroke-2" />
            {/* 비밀번호 입력 필드 */}
            <Input
              {...register("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              showPasswordToggle
              className="border-0 p-3 px-4.5 focus:ring-0"
            />
          </div>

          {/* 에러 메시지 */}
          {(errors.email || errors.password || serverError) && (
            <div
              className="text-system-alert text-sm"
              style={{ fontFamily: "Pretendard" }}
            >
              {errors.email?.message || errors.password?.message || serverError}
            </div>
          )}

          {/* 3회 실패 시 툴팁 */}
          {loginAttempts >= 3 && (
            <div
              className="bg-surface-99 flex items-center gap-2 rounded-lg p-3 text-sm"
              style={{ fontFamily: "Pretendard" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3A972E"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-neutral-60">
                비밀번호를 잊으셨나요?
                <Link
                  href="/reset-password"
                  className="text-primary-50 hover:text-primary-70 ml-1 underline"
                >
                  비밀번호 재설정
                </Link>
                을 이용해보세요.
              </span>
            </div>
          )}

          {/* 자동 로그인 체크박스 */}
          <Checkbox
            {...register("rememberMe")}
            id="rememberMe"
            label="아이디 저장"
            checked={watch("rememberMe")}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          variant="point"
          size="md"
          fullWidth
          disabled={isLoading}
          className="py-5 md:py-6"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>

        {/* 하단 링크 */}
        <div
          className="text-neutral-60 flex items-center justify-center gap-2 text-sm"
          style={{ fontFamily: "Pretendard" }}
        >
          <Link
            href="/reset-password"
            className="hover:text-neutral-20 transition-colors"
          >
            비밀번호 재설정
          </Link>
          <span className="text-neutral-80">ㅣ</span>
          <Link
            href="/signup"
            className="hover:text-neutral-20 transition-colors"
          >
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}

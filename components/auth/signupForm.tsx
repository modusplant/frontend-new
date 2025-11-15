"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { signupSchema, SignupFormValues } from "@/lib/validations/auth";
import { isSignupFormValid } from "@/lib/utils/auth";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/_common/button";

// Sub-components
import EmailSection from "./signup/emailSection";
import PasswordSection from "./signup/passwordSection";
import NicknameSection from "./signup/nicknameSection";
import TermsSection from "./signup/termsSection";

export default function SignupForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    console.log("회원가입 데이터:", data);

    try {
      // API 호출을 위한 데이터 변환
      const signupData = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        agreeToTerms: data.agreeToTerms,
        agreeToPrivacy: data.agreeToPrivacy,
        agreeToCommunity: data.agreeToCommunity,
      };

      const result = await authApi.signup(signupData);

      if (result.success) {
        console.log("회원가입 성공:", result);

        // 자동 로그인 (User 타입에 맞게 수정)
        login({
          id: Date.now().toString(), // 임시 ID
          email: data.email,
        });

        alert("회원가입이 완료되었습니다!");
        router.push("/");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 폼 유효성 검사를 간소화된 방식으로 변경
  const formData = watch();
  const isFormValid =
    formData.agreeToTerms &&
    formData.agreeToPrivacy &&
    !Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
      {/* 이메일 섹션 */}
      <EmailSection
        register={register}
        errors={errors}
        watch={watch}
        trigger={trigger}
      />

      {/* 비밀번호 섹션 */}
      <PasswordSection register={register} errors={errors} />

      {/* 닉네임 섹션 */}
      <NicknameSection
        register={register}
        errors={errors}
        watch={watch}
        trigger={trigger}
      />

      {/* 약관 동의 섹션 */}
      <TermsSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full py-3 md:py-4"
      >
        {isSubmitting ? "처리 중..." : "회원가입"}
      </Button>
    </form>
  );
}

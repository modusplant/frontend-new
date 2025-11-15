import { z } from "zod";

/**
 * 로그인 폼 스키마
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
  rememberMe: z.boolean().optional(),
});

/**
 * 회원가입 폼 스키마
 */
export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일을 입력해주세요"),
    verificationCode: z.string().min(1, "인증코드를 입력해주세요"),
    password: z
      .string()
      .min(
        8,
        "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로 입력해주세요"
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로 입력해주세요"
      ),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    nickname: z
      .string()
      .min(1, "닉네임을 입력해주세요")
      .max(20, "닉네임은 20자 이내로 입력해주세요"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해주세요",
    }),
    agreeToPrivacy: z.boolean().refine((val) => val === true, {
      message: "개인정보처리방침에 동의해주세요",
    }),
    agreeToCommunity: z.boolean().refine((val) => val === true, {
      message: "커뮤니티 운영정책에 동의해주세요",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 서로 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

/**
 * 비밀번호 재설정 폼 스키마
 */
export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일을 입력해주세요"),
    verificationCode: z.string().min(1, "인증코드를 입력해주세요"),
    newPassword: z
      .string()
      .min(
        8,
        "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로 입력해주세요"
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "영문 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호로 입력해주세요"
      ),
    newPasswordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "비밀번호가 서로 일치하지 않습니다",
    path: ["newPasswordConfirm"],
  });

// 타입 추출
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

/**
 * 비밀번호 유효성 검사 함수
 */
export const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  return {
    isValid:
      minLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar,
    requirements: {
      minLength,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
    },
  };
};

/**
 * 이메일 유효성 검사 함수
 */
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

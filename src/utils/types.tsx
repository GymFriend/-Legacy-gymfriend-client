// 로그인 가능한 플랫폼 타입입니다.
export const LoginPlatform = {
  email: "email",
  kakao: "kakao",
  google: "google",
} as const;

export type LoginPlatformType = (typeof LoginPlatform)[keyof typeof LoginPlatform];

// 로그인 가능한 플랫폼 타입입니다.
export const LoginPlatform = {
  email: "email",
  kakao: "kakao",
  google: "google",
} as const;

export type LoginPlatformType = (typeof LoginPlatform)[keyof typeof LoginPlatform];

// 위젯의 크기 타입입니다.
export const WidgetSize = {
  big: "big",
  small: "small",
} as const;

export type WidgetSizeType = (typeof WidgetSize)[keyof typeof WidgetSize];

// 위젯의 색상 타입입니다.
export const WidgetColor = {
  appColor: "appColor",
  grey: "grey",
} as const;

export type WidgetColorType = (typeof WidgetColor)[keyof typeof WidgetColor];

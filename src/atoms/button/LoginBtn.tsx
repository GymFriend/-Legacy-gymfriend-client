import React, { ReactElement } from "react";
import { LoginPlatform, LoginPlatformType } from "../../utils/types";
import { googleSvg, kakaoSvg } from "../../utils/svg";

interface Props {
  // 버튼이 눌렸을 때 처리할 로그인 관련 함수입니다.
  onClick: () => void;
  // 로그인 플랫폼 관련 변수입니다.
  loginPlatform: LoginPlatformType;
}

// 로그인 화면에 들어갈 로그인 버튼입니다.
const LoginBtn = ({ onClick, loginPlatform }: Props): ReactElement => {
  // 각 플랫폼 별 svg 아이콘을 return 하는 함수입니다.
  const svg = (): ReactElement | null => {
    let s: ReactElement | null;

    switch (loginPlatform) {
      case LoginPlatform.kakao:
        s = kakaoSvg(16);
        break;
      case LoginPlatform.google:
        s = googleSvg(16);
        break;
      default:
        s = null;
    }

    return s;
  };

  // 각 플랫폼 별 이름을 return 하는 함수입니다.
  const platform = (): string => {
    let p: string;

    switch (loginPlatform) {
      case LoginPlatform.email:
        p = "이메일";
        break;
      case LoginPlatform.kakao:
        p = "카카오";
        break;
      case LoginPlatform.google:
        p = "구글";
        break;
    }

    return p;
  };

  return (
    <button className={`login-btn login-btn__${loginPlatform}`} onClick={onClick}>
      <div>{svg()}</div>
      <span>{platform()}로 로그인</span>
    </button>
  );
};

export default LoginBtn;

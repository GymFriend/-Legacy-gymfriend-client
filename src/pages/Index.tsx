import React, { ReactElement, useEffect } from "react";
import LoginBtn from "../atoms/button/LoginBtn";
import { LoginPlatform } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootReducer";
import { clientPath } from "../utils/constant";

// 앱의 entry point입니다. 로그인 및 회원가입 기능이 포함되어 있습니다.
const Index = (): ReactElement => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.account.isLoggedIn);

  const navigate = useNavigate();

  const gotoHome = (): void => {
    navigate("/home");
  };

  const kakaoOAuth2Login = async (): Promise<void> => {
    const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${clientPath}/${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  useEffect(() => {
    isLoggedIn && navigate("/home");
  }, []);

  return (
    <div className="index page">
      <div className="index__intro">
        <div className="index__desc">
          <span className="index__desc--title">GymFriend</span>
          <span className="index__desc--sub">운동을 더욱 쉽고 재밌게!</span>
        </div>
      </div>
      <div className="index__login">
        <LoginBtn onClick={kakaoOAuth2Login} loginPlatform={LoginPlatform.kakao} />
        <LoginBtn onClick={gotoHome} loginPlatform={LoginPlatform.google} />
        <LoginBtn onClick={() => {}} loginPlatform={LoginPlatform.email} />
      </div>
    </div>
  );
};

export default Index;

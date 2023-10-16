import React, { ReactElement } from "react";
import LoginBtn from "../atoms/button/LoginBtn";
import { LoginPlatform } from "../utils/types";

// 앱의 entry point입니다. 로그인 및 회원가입 기능이 포함되어 있습니다.
const Index = (): ReactElement => {
  return (
    <div className="index page">
      <div className="index__intro">
        <div className="index__desc">
          <span className="index__desc--title">짐프랜드</span>
          <span className="index__desc--sub">운동을 더욱 쉽고 재밌게!</span>
        </div>
        <img alt="main" src="images/test.jpg" />
      </div>
      <div className="index__login">
        <LoginBtn onClick={() => {}} loginPlatform={LoginPlatform.kakao} />
        <LoginBtn onClick={() => {}} loginPlatform={LoginPlatform.google} />
        <LoginBtn onClick={() => {}} loginPlatform={LoginPlatform.email} />
      </div>
    </div>
  );
};

export default Index;

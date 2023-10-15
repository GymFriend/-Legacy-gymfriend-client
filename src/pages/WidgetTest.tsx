import React, { ReactElement } from "react";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import LoginBtn from "../atoms/button/LoginBtn";
import { LoginPlatform } from "../utils/types";

// 컴포넌트 테스트용 화면입니다.
// 퍼블리싱 환경에선 비활성화 혹은 삭제 요망
const WidgetTest = (): ReactElement => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <PrimaryBtn label="PrimaryBtn" onClick={() => {}} />
      <LoginBtn onClick={() => {}} loginPlatform={LoginPlatform.kakao} />
    </div>
  );
};

export default WidgetTest;

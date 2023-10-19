import React, { ReactElement } from "react";

// 컴포넌트 테스트용 화면입니다.
// 퍼블리싱 환경에선 비활성화 혹은 삭제 요망
const WidgetTest = (): ReactElement => {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}></div>;
};

export default WidgetTest;

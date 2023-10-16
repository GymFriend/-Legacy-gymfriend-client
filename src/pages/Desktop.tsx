import React, { ReactElement } from "react";

// 유저의 접속 환경이 모바일이 아닐경우 redirect되는 페이지입니다.
const Desktop = (): ReactElement => {
  return (
    <div className="desktop page">
      <span>짐프랜드는 모바일 환경만 지원합니다.</span>
    </div>
  );
};

export default Desktop;

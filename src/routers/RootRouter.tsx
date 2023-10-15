import { ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Index from "../pages/Index";
import WidgetTest from "../pages/WidgetTest";
import { isMobile } from "react-device-detect";
import Desktop from "../pages/Desktop";

const RootRouter = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isMobile ? <Index /> : <Desktop />} />
        {/* 컴포넌트 테스트용 화면입니다. 퍼블리싱 환경에선 비활성화 혹은 삭제 요망 */}
        <Route path="/test" element={<WidgetTest />} />
      </Routes>
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default RootRouter;

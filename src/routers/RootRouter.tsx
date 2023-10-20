import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Index from "../pages/Index";
import WidgetTest from "../pages/WidgetTest";
import Desktop from "../pages/Desktop";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import Join from "../pages/Join";

const RootRouter = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isMobile ? <Index /> : <Desktop />} />
        <Route path="/home" element={isMobile ? <Home /> : <Desktop />} />
        <Route path="/join" element={isMobile ? <Join /> : <Desktop />} />
        {/* 컴포넌트 테스트용 화면입니다. 퍼블리싱 환경에선 비활성화 혹은 삭제 요망 */}
        <Route path="/test" element={<WidgetTest />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;

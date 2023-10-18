import { createProxyMiddleware } from "http-proxy-middleware";

// 개발 단계에서 Naver api 사용을 위한 proxy 설정입니다.
export default (app: any) => {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
};

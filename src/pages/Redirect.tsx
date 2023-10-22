import React, { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchKakaoLogin } from "../store/thunk/AuthThunk";

const Redirect = (): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();

  const params: URLSearchParams = new URLSearchParams(location.search);
  const code: string | null = params.get("code");

  useEffect(() => {
    dispatch(fetchKakaoLogin(code!) as any).then(() => {
      window.location.href = "/";
    });
  }, []);

  return <div></div>;
};

export default Redirect;

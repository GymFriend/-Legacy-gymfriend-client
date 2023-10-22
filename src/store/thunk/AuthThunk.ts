import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { serverPath } from "../../utils/constant";
import { KakaoAccount } from "../../models/User";

export const fetchKakaoLogin = createAsyncThunk("auth/kakao", async (code: string): Promise<KakaoAccount> => {
  const response: AxiosResponse = await axios.get(`${serverPath}/auth/kakao`, {
    headers: {
      Authorization: `Bearer ${code}`,
    },
  });

  const result: KakaoAccount = response.data;
  result.createdAt = new Date(result.createdAt);

  return result;
});

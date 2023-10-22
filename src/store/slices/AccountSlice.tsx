import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { fetchKakaoLogin } from "../thunk/AuthThunk";
import { curChallenge, prevChallenges } from "../../utils/test";

interface InitialState {
  user: User;
  isLoggedIn: boolean;
}

const initialState: InitialState = {
  user: {
    kakaoAccount: {
      uuid: "",
      kakaoId: 0,
      kakaoEmail: "",
      kakaoNickname: "",
      kakaoProfileImgUrl: "",
      kakaoThumbnailImgUrl: "",
      createdAt: new Date(),
      token: {
        accessToken: "",
        refreshToken: "",
      },
    },
    point: 0,
  },
  isLoggedIn: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchKakaoLogin.fulfilled, (state, action) => {
      state.user = {
        kakaoAccount: action.payload,
        point: 50000,
        prevChallenges: prevChallenges,
        curChallenge: curChallenge,
      };
      state.isLoggedIn = true;
    });
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;

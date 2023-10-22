import { ChallengeInfo } from "./Gym";

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface KakaoAccount {
  uuid: string;
  kakaoId: number;
  kakaoEmail: string;
  kakaoNickname: string;
  kakaoProfileImgUrl: string;
  kakaoThumbnailImgUrl: string;
  createdAt: Date;
  token: Token;
}

export interface User {
  kakaoAccount: KakaoAccount;
  point: number;
  prevChallenges?: ChallengeInfo[];
  curChallenge?: ChallengeInfo;
}

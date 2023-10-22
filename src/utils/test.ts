import { ChallengeInfo } from "../models/Gym";

//////////////////////////////////////////////////////////////////////
// 테스트용 임시 객체 ////////////////////////////////////////////////////
export const prevChallenges: ChallengeInfo[] = [
  {
    gymName: "해피짐 송파점",
    span: {
      startAt: new Date(2023, 1, 1),
      endAt: new Date(2023, 1, 7),
    },
    success: true,
    class: 7,
    progress: 100,
  },
  {
    gymName: "퍼니짐 가락점",
    span: {
      startAt: new Date(2023, 4, 10),
      endAt: new Date(2023, 4, 16),
    },
    success: false,
    class: 3,
    progress: 81,
  },
  {
    gymName: "블루짐 헬리오시티점",
    span: {
      startAt: new Date(2023, 4, 20),
      endAt: new Date(2023, 4, 26),
    },
    success: true,
    class: 5,
    progress: 100,
  },
  {
    gymName: "블루짐 헬리오시티점",
    span: {
      startAt: new Date(2023, 4, 20),
      endAt: new Date(2023, 4, 26),
    },
    success: true,
    class: 3,
    progress: 100,
  },
  {
    gymName: "블루짐 헬리오시티점",
    span: {
      startAt: new Date(2023, 4, 20),
      endAt: new Date(2023, 4, 26),
    },
    success: true,
    class: 7,
    progress: 100,
  },
  {
    gymName: "퍼니짐 가락점",
    span: {
      startAt: new Date(2023, 4, 10),
      endAt: new Date(2023, 4, 16),
    },
    success: false,
    class: 1,
    progress: 0,
  },
  {
    gymName: "퍼니짐 가락점",
    span: {
      startAt: new Date(2023, 4, 10),
      endAt: new Date(2023, 4, 16),
    },
    success: true,
    class: 1,
    progress: 100,
  },
];

export const curChallenge: ChallengeInfo = {
  gymName: "블루짐 헬리오시티점",
  span: {
    startAt: new Date(2023, 5, 3),
    endAt: new Date(2023, 5, 9),
  },
  success: false,
  class: 3,
  progress: 31,
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

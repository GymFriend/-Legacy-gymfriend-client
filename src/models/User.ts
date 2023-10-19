import { ChallengeInfo, CurrentChallengeInfo } from "./Gym";

export interface User {
  uuid: string;
  name: string;
  point: number;
  prevChallenges?: ChallengeInfo[];
  curChallenge?: CurrentChallengeInfo;
}

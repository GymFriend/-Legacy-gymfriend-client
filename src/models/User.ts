import { ChallengeInfo } from "./Gym";

export interface User {
  uuid: string;
  name: string;
  point: number;
  prevChallenges?: ChallengeInfo[];
  curChallenge?: ChallengeInfo;
}

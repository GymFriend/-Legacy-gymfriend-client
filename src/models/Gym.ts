export interface GymInfo {
  title: string;
  address: string;
  roadAddress: string;
  telephone: string;
  description: string;
  category: string;
  link: string;
  mapx: number;
  mapy: number;
}

export interface ChallengeInfo {
  gymName: string;
  span: {
    startAt: Date;
    endAt: Date;
  };
  success: boolean;
  class: number;
  progress: number;
}

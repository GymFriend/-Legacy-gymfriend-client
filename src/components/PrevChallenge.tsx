import React, { ReactElement } from "react";
import { ChallengeInfo } from "../models/Gym";
import { format } from "date-fns";

interface Props {
  challenge: ChallengeInfo;
}

const PrevChallenge = ({ challenge }: Props): ReactElement => {
  return (
    <div className="prev-challenge">
      <div className="prev-challenge__info">
        <span>{challenge.gymName}</span>
        <span>
          {format(challenge.span.startAt, "yyyy-MM-dd")} ~ {format(challenge.span.endAt, "yyyy-MM-dd")}
        </span>
      </div>
      <div className="prev-challenge__status">
        <div className="prev-challenge__chip" style={{ borderColor: challenge.success ? "blue" : "red" }}>
          <span>{challenge.success ? "성공" : "실패"}</span>
        </div>
      </div>
    </div>
  );
};

export default PrevChallenge;

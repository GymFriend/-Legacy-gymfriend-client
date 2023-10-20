import React, { ReactElement } from "react";
import { ChallengeInfo } from "../models/Gym";
import { format } from "date-fns";
import { dateFormatYMD } from "../utils/constant";

interface Props {
  challenge: ChallengeInfo;
}

const PrevChallenge = ({ challenge }: Props): ReactElement => {
  return (
    <div className="prev-challenge">
      <div className="prev-challenge__info">
        <span className="prev-challenge__gymname">{challenge.gymName}</span>
        <span className="prev-challenge__span">
          {format(challenge.span.startAt, dateFormatYMD)} ~ {format(challenge.span.endAt, dateFormatYMD)}
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

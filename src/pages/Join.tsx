import React, { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import { GymInfo } from "../models/Gym";
import ToggleBtn from "../atoms/button/ToggleBtn";
import { joinableChallenge } from "../utils/constant";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import { WidgetColor, WidgetSize } from "../utils/types";

const category: string[] = ["챌린지", "경쟁전"];

interface ChallengeBoxProps {
  value: number;
}

const ChallengeBox = ({ value }: ChallengeBoxProps): ReactElement => {
  return (
    <div className="challenge-box">
      <div className="challenge-box__info">
        <img src={`images/challenge_${value}.png`} />
        <span>주 {value}회 출석 챌린지</span>
      </div>
      <PrimaryBtn label="참가가능" onClick={() => {}} widgetSize={WidgetSize.small} widgetColor={WidgetColor.appColor} />
    </div>
  );
};

const Join = (): ReactElement => {
  const location = useLocation();
  const gymInfo: GymInfo = location.state.gymInfo;

  const [currentCategory, setCurrentCategory] = useState<string>(category[0]);

  const onCurrentCategory = (c: string) => {
    setCurrentCategory(c);
  };

  return (
    <div className="join page">
      <div className="join__header">
        <span>{gymInfo.title.replace(/<b>|<\/b>/g, "")}</span>
      </div>
      <div className="join__nav">
        {category.map((v, idx) => {
          return <ToggleBtn key={idx} label={v} onClick={() => onCurrentCategory(v)} activate={currentCategory === v} style={{ marginRight: 10 }} />;
        })}
      </div>
      {currentCategory === category[0] ? (
        <div className="join__body join__body--challenge">
          <div className="join__challenge-list">
            {joinableChallenge.map((v, idx) => {
              return <ChallengeBox key={idx} value={v} />;
            })}
          </div>
        </div>
      ) : (
        <div className="join__body join__body--competitive">준비중인 기능입니다</div>
      )}
    </div>
  );
};

export default Join;

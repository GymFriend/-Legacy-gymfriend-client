import React, { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import { GymInfo } from "../models/Gym";
import ToggleBtn from "../atoms/button/ToggleBtn";
import { joinableChallenge } from "../utils/constant";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import { WidgetColor, WidgetSize } from "../utils/types";
import { BottomSheet } from "react-spring-bottom-sheet";
import { stopPropagation } from "../utils/helper";

const category: string[] = ["챌린지", "경쟁전"];
const price: number[] = [1000, 5000, 10000];

interface ChallengeBoxProps {
  value: number;
  toggle: boolean;
  selectedPrice: number | undefined;
  onClass: (v: number) => void;
  onPrice: (v: number) => void;
  onSubmit: () => void;
}

const ChallengeBox = ({ value, toggle, selectedPrice, onClass, onPrice, onSubmit }: ChallengeBoxProps): ReactElement => {
  return (
    <div className="challenge">
      <div className="challenge__box">
        <div className="challenge__info">
          <img src={`images/challenge_${value}.png`} />
          <span>주 {value}회 출석 챌린지</span>
        </div>
        <PrimaryBtn label="참가가능" onClick={() => onClass(value)} widgetSize={WidgetSize.small} widgetColor={WidgetColor.appColor} />
      </div>
      {toggle && (
        <div className="challenge__dropdown">
          {price.map((v, idx) => {
            return (
              <div key={idx} className={`challenge__price-box ${selectedPrice === v && "challenge__price-box--selected"}`} onClick={() => onPrice(v)}>
                <span>{v}원</span>
              </div>
            );
          })}
          <PrimaryBtn label="참여하기" onClick={selectedPrice ? onSubmit : () => {}} widgetSize={WidgetSize.big} widgetColor={selectedPrice ? WidgetColor.appColor : WidgetColor.grey} />
        </div>
      )}
    </div>
  );
};

const Join = (): ReactElement => {
  const location = useLocation();
  const gymInfo: GymInfo = location.state.gymInfo;

  const [currentCategory, setCurrentCategory] = useState<string>(category[0]);
  const [selectedClass, setSelectedClass] = useState<number | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined);
  const [bottomSheetToggle, setBottomShtteToggle] = useState<boolean>(false);

  // 카테고리를 선택하는 함수입니다 (챌린지 or 경쟁전)
  const onCurrentCategory = (c: string) => {
    setCurrentCategory(c);
  };

  // 챌린지 종류를 선택하는 함수입니다
  const onSelectedClass = (c: number): void => {
    if (selectedClass && selectedClass === c) {
      setSelectedClass(undefined);
      setSelectedPrice(undefined);
      return;
    }

    setSelectedClass(c);
    setSelectedPrice(undefined);
  };

  // 챌린지 가격을 선택하는 함수입니다
  const onSelectedPrice = (p: number): void => {
    if (selectedPrice === p) {
      setSelectedPrice(undefined);
      return;
    }

    setSelectedPrice(p);
  };

  // BottomSheet를 on하는 함수입니다
  const onBottomSheetOn = (): void => {
    setBottomShtteToggle(true);
  };

  // BottomSheet를 off하는 함수입니다
  const onBottomSheetOff = (): void => {
    setBottomShtteToggle(false);
  };

  // 챌린지를 제출하는 함수입니다
  const onSubmit = (): void => {
    console.log(`class: ${selectedClass}, price: ${selectedPrice}`);
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
              return <ChallengeBox key={idx} value={v} toggle={selectedClass === v} selectedPrice={selectedPrice} onClass={onSelectedClass} onPrice={onSelectedPrice} onSubmit={onBottomSheetOn} />;
            })}
          </div>
        </div>
      ) : (
        <div className="join__body join__body--competitive">준비중인 기능입니다</div>
      )}
      <BottomSheet open={bottomSheetToggle} onDismiss={onBottomSheetOff} onClick={stopPropagation}>
        <div className="join__bottom-sheet-container">
          <div className="join__caution">
            <span>- 챌린지 보상은 어려운 챌린지일수록, 많은 예치금을 걸수록 더 높은 보상을 받을 수 있습니다.</span>
            <span>- 챌린지 실패시 챌린지 성공율 만큼의 포인트를 되돌려 받습니다.</span>
            <span>- 포인트는 10,000 포인트가 되었을 때 현금으로 인출 할 수 있으며, 이전에는 헬스장 재등록, 건강기능 식품 구매 인증시 환급해 드립니다.</span>
          </div>
          <div className="join__bill">
            <span>신청한 챌린지: 주 {selectedClass}회 출석 챌린지</span>
            <span>챌린지 금액: {selectedPrice?.toLocaleString()}원</span>
          </div>
          <PrimaryBtn label="참여하기" onClick={onSubmit} widgetSize={WidgetSize.big} widgetColor={WidgetColor.appColor} />
        </div>
      </BottomSheet>
    </div>
  );
};

export default Join;

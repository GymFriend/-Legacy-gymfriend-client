import React, { ReactElement, useEffect, useState } from "react";
import SearchInput from "../atoms/input/SearchInput";
import { useInput } from "../hooks/UseInput";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Coordinate } from "../utils/interfaces";
import { fetchGymInfo } from "../apis/MapApi";
import { ChallengeInfo, GymInfo } from "../models/Gym";
import { WidgetColor, WidgetSize } from "../utils/types";
import { stopPropagation } from "../utils/helper";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import Map from "../components/Map";
import { User } from "../models/User";
import ProgressBar from "../atoms/ProgressBar";
import UnderlineBtn from "../atoms/button/UnderlineBtn";
import { format } from "date-fns";
import { dateFormatYMD } from "../utils/constant";
import "react-spring-bottom-sheet/dist/style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootReducer";
import { useAuth } from "../hooks/UseAuth";

const category: string[] = ["챌린지", "히스토리"];

interface PrevChallengeProps {
  challenge: ChallengeInfo;
}

const PrevChallenge = ({ challenge }: PrevChallengeProps): ReactElement => {
  return (
    <div className="prev-challenge">
      <div className="prev-challenge__info">
        <div className="prev-challenge__title">
          <span>{challenge.gymName}</span>
          <img src={`images/challenge_${challenge.class}.png`} />
        </div>
        <span className="prev-challenge__span">
          {format(new Date(challenge.span.startAt), dateFormatYMD)} ~ {format(new Date(challenge.span.endAt), dateFormatYMD)}
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

const Home = (): ReactElement => {
  useAuth();

  const navigate = useNavigate();
  const user: User = useSelector((state: RootState) => state.account.user);

  const [validLocationPermission, setValidLocationPermission] = useState<boolean>(false);
  const [userLocation, setuserLocation] = useState<Coordinate | null>(null);
  const [searchedGym, setSearchedGym] = useState<GymInfo[]>([]);
  const [selectedGym, setSelectedGym] = useState<GymInfo | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>(category[0]);
  const [bottomSheetToggle, setBottomShtteToggle] = useState<boolean>(false);
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);

  const [gymSearch, setGymSearch, resetGymSearch] = useInput<string>("");

  // 유저에게 위치 권한을 요청하는 코드입니다.
  const requestLocationPermission = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          // 위치 정보를 성공적으로 가져온 경우
          setValidLocationPermission(true);
          setuserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err: GeolocationPositionError) => {
          if (err.code === err.PERMISSION_DENIED) {
            setValidLocationPermission(false);
            alert("위치 정보 승인 후 다시 이용해 주세요.");
          }
        }
      );
    } else {
      // 브라우저가 Geolocation API를 지원하지 않는 경우에 대한 처리를 추가
      setValidLocationPermission(false);
      alert("브라우저가 Geolocation API를 지원하지 않습니다.");
    }
  };

  // 헬스장 정보를 요청하는 코드입니다
  const requestGymInfo = async (): Promise<void> => {
    if (gymSearch === "") {
      alert("검색어를 입력해 주세요.");
      return;
    }

    // 유저가 검색한 query에 대한 헬스장 정보가 담긴 배열입니다
    const response: GymInfo[] = await fetchGymInfo(gymSearch);

    setSearchedGym(response);
    setDropdownToggle(true);
  };

  // 현재 카테고리를 선택하는 함수입니다
  const onCurrentCategory = (c: string) => {
    setCurrentCategory(c);
  };

  // BottomSheet를 on하는 함수입니다
  const onBottomSheetOn = (gymInfo: GymInfo): void => {
    setSelectedGym(gymInfo);
    setBottomShtteToggle(true);
  };

  // BottomSheet를 off하는 함수입니다
  const onBottomSheetOff = (): void => {
    setSelectedGym(null);
    setBottomShtteToggle(false);
  };

  // Dropdown을 off하는 함수입니다
  const onDropdownOff = (): void => {
    setDropdownToggle(false);
  };

  // 챌린지 및 경쟁전 등록 페이지로 이동하는 함수입니다
  const gotoJoin = (): void => {
    navigate("/join", { state: { gymInfo: selectedGym } });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const intervalId: NodeJS.Timer = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        // 위치 정보를 성공적으로 가져온 경우
        setValidLocationPermission(true);
        setuserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [validLocationPermission]);

  return (
    <div className="home page" onClick={onDropdownOff}>
      <div className="home__header">
        <div className="home__user">
          <img src="images/challenge_1.png" />
          <span>{user.kakaoAccount.kakaoNickname}</span>
        </div>
        <span>{user.point.toLocaleString()}P</span>
      </div>
      <div className="home__nav">
        {category.map((v, idx) => {
          return <UnderlineBtn key={idx} label={v} onClick={() => onCurrentCategory(v)} activate={currentCategory === v} style={{ marginRight: 10 }} />;
        })}
      </div>
      {currentCategory === category[0] ? (
        <div key="home-body-challenge" className="home__body home__body--challenge">
          {user.curChallenge ? (
            <>
              <div className="home__status">
                <div className="home__current-challenge">
                  <img src={`images/challenge_${user.curChallenge.class}.png`} />
                  <span>주 {user.curChallenge.class}회 출석 챌린지</span>
                </div>
                <div className="home__current-gym">
                  <span>{user.curChallenge.gymName}</span>
                  <span>
                    {format(new Date(user.curChallenge.span.startAt), dateFormatYMD)} ~ {format(new Date(user.curChallenge.span.endAt), dateFormatYMD)}
                  </span>
                </div>
                <div className="home__progress">
                  <ProgressBar width={user.curChallenge.progress} />
                  <span>{user.curChallenge.progress}%</span>
                </div>
              </div>
              <PrimaryBtn label="출석하기" onClick={() => {}} widgetSize={WidgetSize.big} widgetColor={WidgetColor.appColor} />
            </>
          ) : (
            <>
              <div className="home__search" onClick={stopPropagation}>
                <SearchInput onChange={setGymSearch} placeholder="헬스장을 검색해주세요." prefix={<PrimaryBtn label="검색" onClick={requestGymInfo} widgetSize={WidgetSize.small} widgetColor={WidgetColor.appColor} />} />
                <div className={`home__gym-search-container home__gym-search-container--${dropdownToggle ? "on" : "off"}`}>
                  {searchedGym.map((v, idx) => {
                    return (
                      <div key={idx} className="home__searched-gym" onClick={() => onBottomSheetOn(v)}>
                        <span>{v.title.replace(/<b>|<\/b>/g, "")}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="home__no-challenge">
                <span className="home__no-result">진행중인 챌린지가 없어요😢</span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div key="home-body-history" className="home__body home__body--history">
          {user.prevChallenges ? (
            <>
              {user.prevChallenges.map((v, idx) => {
                return <PrevChallenge key={idx} challenge={v} />;
              })}
            </>
          ) : (
            <span className="home__no-result">챌린지 기록이 없어요😢</span>
          )}
        </div>
      )}
      <BottomSheet open={bottomSheetToggle} onDismiss={onBottomSheetOff} onClick={stopPropagation}>
        {selectedGym && (
          <div className="home__bottom-sheet-container">
            <div className="home__gym-detail">
              <span className="home__gym-detail--title">{selectedGym.title.replace(/<b>|<\/b>/g, "")}</span>
              <span className="home__gym-detail--address">{selectedGym.address}</span>
            </div>
            <Map location={{ lat: selectedGym.mapy, lng: selectedGym.mapx }} />
            <PrimaryBtn label="등록하기" onClick={gotoJoin} widgetSize={WidgetSize.big} widgetColor={WidgetColor.appColor} />
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default Home;

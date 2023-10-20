import React, { ReactElement, useEffect, useState } from "react";
import SearchInput from "../atoms/input/SearchInput";
import { useInput } from "../hooks/UseInput";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Coordinate } from "../utils/interfaces";
import { fetchGymInfo } from "../apis/MapApi";
import { ChallengeInfo, CurrentChallengeInfo, GymInfo } from "../models/Gym";
import { WidgetColor, WidgetSize } from "../utils/types";
import { stopPropagation } from "../utils/helper";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import Map from "../components/Map";
import { User } from "../models/User";
import PrevChallenge from "../components/PrevChallenge";
import ProgressBar from "../atoms/ProgressBar";
import UnderlineBtn from "../atoms/button/UnderlineBtn";
import { format } from "date-fns";
import { dateFormatYMD } from "../utils/constant";
import "react-spring-bottom-sheet/dist/style.css";

const category: string[] = ["챌린지", "히스토리"];

const Home = (): ReactElement => {
  const [validLocationPermission, setValidLocationPermission] = useState<boolean>(false);
  const [userLocation, setuserLocation] = useState<Coordinate | null>(null);
  const [searchedGym, setSearchedGym] = useState<GymInfo[]>([]);
  const [selectedGym, setSelectedGym] = useState<GymInfo | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>(category[0]);
  const [bottomSheetToggle, setBottomShtteToggle] = useState<boolean>(false);
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);

  const [gymSearch, setGymSearch, resetGymSearch] = useInput<string>("");

  //////////////////////////////////////////////////////////////////////
  // 테스트용 임시 객체 ////////////////////////////////////////////////////
  const prevChallenges: ChallengeInfo[] = [
    {
      gymName: "해피짐 송파점",
      span: {
        startAt: new Date(2023, 1, 1),
        endAt: new Date(2023, 1, 7),
      },
      success: true,
      class: "주 7회 출석 챌린지",
    },
    {
      gymName: "퍼니짐 가락점",
      span: {
        startAt: new Date(2023, 4, 10),
        endAt: new Date(2023, 4, 16),
      },
      success: false,
      class: "주 3회 출석 챌린지",
    },
    {
      gymName: "블루짐 헬리오시티점",
      span: {
        startAt: new Date(2023, 4, 20),
        endAt: new Date(2023, 4, 26),
      },
      success: true,
      class: "주 5회 출석 챌린지",
    },
    {
      gymName: "블루짐 헬리오시티점",
      span: {
        startAt: new Date(2023, 4, 20),
        endAt: new Date(2023, 4, 26),
      },
      success: true,
      class: "주 5회 출석 챌린지",
    },
    {
      gymName: "블루짐 헬리오시티점",
      span: {
        startAt: new Date(2023, 4, 20),
        endAt: new Date(2023, 4, 26),
      },
      success: true,
      class: "주 5회 출석 챌린지",
    },
    {
      gymName: "퍼니짐 가락점",
      span: {
        startAt: new Date(2023, 4, 10),
        endAt: new Date(2023, 4, 16),
      },
      success: false,
      class: "주 3회 출석 챌린지",
    },
  ];

  const curChallenge: CurrentChallengeInfo = {
    gymName: "블루짐 헬리오시티점",
    span: {
      startAt: new Date(2023, 5, 3),
      endAt: new Date(2023, 5, 9),
    },
    success: false,
    class: "주 3회 출석 챌린지",
    progress: 31,
  };

  const user: User = {
    uuid: "096ccbfe-6e66-11ee-b962-0242ac120002",
    name: "짐프랜드",
    point: 50000,
    prevChallenges: prevChallenges,
    curChallenge: curChallenge,
  };

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

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
        <span>{user.name}</span>
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
                <span>{user.curChallenge.class}</span>
                <div className="home__current-gym">
                  <span>{user.curChallenge.gymName}</span>
                  <span>
                    {format(user.curChallenge.span.startAt, dateFormatYMD)} ~ {format(user.curChallenge.span.endAt, dateFormatYMD)}
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
            <PrimaryBtn label="등록하기" onClick={() => {}} widgetSize={WidgetSize.big} widgetColor={WidgetColor.appColor} />
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default Home;

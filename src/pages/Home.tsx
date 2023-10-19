import React, { ReactElement, useEffect, useState } from "react";
import SearchInput from "../atoms/input/SearchInput";
import { useInput } from "../hooks/UseInput";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Coordinate } from "../utils/interfaces";
import "react-spring-bottom-sheet/dist/style.css";
import { fetchGymInfo } from "../apis/MapApi";
import { GymInfo } from "../models/Gym";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import { WidgetColor, WidgetSize } from "../utils/types";
import Map from "../components/Map";

const Home = (): ReactElement => {
  const [validLocationPermission, setValidLocationPermission] = useState<boolean>(false);
  const [userLocation, setuserLocation] = useState<Coordinate | null>(null);
  const [searchedGym, setSearchedGym] = useState<GymInfo[]>([]);
  const [selectedGym, setSelectedGym] = useState<GymInfo | null>(null);
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
        <span>짐프랜드</span>
        <span>20,000P</span>
      </div>
      <div className="home__search" onClick={(e: any) => e.stopPropagation()}>
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
      {selectedGym && (
        <BottomSheet open={bottomSheetToggle} onDismiss={onBottomSheetOff} onClick={(e: any) => e.stopPropagation()}>
          <div className="home__bottom-sheet-container">
            <div className="home__gym-detail">
              <span className="home__gym-detail--title">{selectedGym.title.replace(/<b>|<\/b>/g, "")}</span>
              <span className="home__gym-detail--address">{selectedGym.address}</span>
            </div>
            <Map location={{ lat: selectedGym.mapy, lng: selectedGym.mapx }} />
            <PrimaryBtn label="등록하기" onClick={() => {}} widgetSize={WidgetSize.big} widgetColor={WidgetColor.appColor} />
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default Home;

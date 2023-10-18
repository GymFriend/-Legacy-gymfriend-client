import React, { ReactElement, useEffect, useState } from "react";
import SearchInput from "../atoms/input/SearchInput";
import { useInput } from "../hooks/UseInput";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Coordinate } from "../utils/interfaces";
import "react-spring-bottom-sheet/dist/style.css";
import { fetchGymInfo } from "../apis/MapApi";
import { GymInfo } from "../models/Gym";

const Home = (): ReactElement => {
  const [validLocationPermission, setValidLocationPermission] = useState<boolean>(false);
  const [userLocation, setuserLocation] = useState<Coordinate | null>(null);
  const [bottomSheetToggle, setBottomShtteToggle] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<GymInfo[]>([]);

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
    const response: GymInfo[] = await fetchGymInfo("송파역 헬스장");
    console.log(response);
  };

  // BottomSheet를 toggle하는 코드입니다
  const onBottomSheetToggle = (): void => {
    setBottomShtteToggle(!bottomSheetToggle);
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
    <div className="home page">
      <div className="home__header">
        <span>짐프랜드</span>
        <span>20,000P</span>
      </div>
      <div className="home__input">
        <SearchInput onChange={setGymSearch} placeholder="헬스장 검색" />
      </div>
      <button onClick={requestGymInfo}>api request</button>
      <BottomSheet open={bottomSheetToggle} onDismiss={onBottomSheetToggle}>
        <div className="home__bottom-sheet-container"></div>
      </BottomSheet>
    </div>
  );
};

export default Home;

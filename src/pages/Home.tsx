import React, { ReactElement, useEffect, useRef, useState } from "react";
import SearchInput from "../atoms/input/SearchInput";
import { useInput } from "../hooks/UseInput";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { fetchGymInfo } from "../apis/MapApi";

const Home = (): ReactElement => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { naver }: any = window;

  const [userLocation, setuserLocation] = useState<{ lat: number; lng: number }>({ lat: 37.5656, lng: 126.9769 });
  const [bottomSheetToggle, setBottomShtteToggle] = useState<boolean>(false);

  const [validLocationPermission, setValidLocationPermission] = useState<boolean>(false);
  const [gymSearch, setGymSearch, resetGymSearch] = useInput<string>("");

  // 지도를 초기화하는 코드입니다.
  const initMap = (): void => {
    if (!mapRef.current || !naver) return;

    // 유저의 위치입니다
    const useLocation: any = new naver.maps.LatLng(userLocation.lat, userLocation.lng);
    const mapOptions: any = {
      center: useLocation,
      zoom: 17,
    };

    const map: any = new naver.maps.Map(mapRef.current, mapOptions);

    const gymMarkers = [
      { lat: 37.4970497303391, lng: 127.10640182261494 },
      { lat: 37.49735965599469, lng: 127.10742003263563 },
    ];

    // 유저의 위치를 마커로 표시합니다
    new naver.maps.Marker({
      position: useLocation,
      map,
    });

    // 헬스장 위치를 마커로 표시합니다
    gymMarkers.forEach((m) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(m.lat, m.lng),
        map,
      });
    });
  };

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
    const result: any = await fetchGymInfo(userLocation);
    console.log(result);
  };

  const onBottomSheetToggle = (): void => {
    setBottomShtteToggle(!bottomSheetToggle);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    initMap();
  }, [userLocation]);

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
      <div ref={mapRef} className="home__map" />
      <div className="home__input">
        <SearchInput onChange={setGymSearch} />
      </div>
      <button style={{ position: "absolute", top: "200px" }} onClick={requestGymInfo}>
        api request
      </button>
      <button style={{ position: "absolute", top: "220px" }} onClick={onBottomSheetToggle}>
        bottomsheet
      </button>
      <BottomSheet open={bottomSheetToggle} onDismiss={onBottomSheetToggle}>
        <div className="home__bottom-sheet-container"></div>
      </BottomSheet>
    </div>
  );
};

export default Home;

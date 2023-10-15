import React, { ReactElement, useEffect, useRef, useState } from "react";

const Home = (): ReactElement => {
  const mapElement = useRef(null);
  const { naver }: any = window;

  const [userLatitude, setUserLatitude] = useState(37.5656);
  const [userLongitude, setUserLongitude] = useState(126.9769);

  const requestLocationPermission = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // 위치 정보를 성공적으로 가져온 경우
          setUserLatitude(pos.coords.latitude);
          setUserLongitude(pos.coords.longitude);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            alert("위치 동의 필요");
          }
        }
      );
    } else {
      // 브라우저가 Geolocation API를 지원하지 않는 경우에 대한 처리를 추가
      console.log("브라우저가 Geolocation API를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location: any = new naver.maps.LatLng(userLatitude, userLongitude);
    const mapOptions: any = {
      center: location,
      zoom: 17,
    };

    const map: any = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [userLatitude, userLongitude]);

  return (
    <div className="home page">
      <div ref={mapElement} className="home__map" />
    </div>
  );
};

export default Home;

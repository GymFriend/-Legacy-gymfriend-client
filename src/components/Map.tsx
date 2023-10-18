import React, { ReactElement } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";
import { Coordinate } from "../utils/interfaces";

interface Props {
  location: Coordinate;
  markers: Coordinate[];
  onMarkerClick: () => void;
}

const Map = ({ location, markers, onMarkerClick }: Props): ReactElement => {
  const navermaps = useNavermaps();

  return (
    <MapDiv className="map">
      <NaverMap defaultCenter={new navermaps.LatLng(location.lat, location.lng)} defaultZoom={17}>
        <Marker
          position={location}
          icon={{
            // TODO: 유저 마커 변경
            content: `<div>0</div>`,
          }}
        />
        {markers.map((m, idx) => {
          return <Marker key={idx} position={new navermaps.LatLng(m.lat, m.lng)} onClick={onMarkerClick} />;
        })}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;

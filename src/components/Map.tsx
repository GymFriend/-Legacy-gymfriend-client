import React, { ReactElement } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";
import { Coordinate } from "../utils/interfaces";
import { integerToDecimal } from "../utils/helper";

interface Props {
  location: Coordinate;
}

const Map = ({ location }: Props): ReactElement => {
  const navermaps = useNavermaps();

  const coordinate: Coordinate = {
    lat: integerToDecimal(location.lat, 2),
    lng: integerToDecimal(location.lng, 3),
  };

  return (
    <MapDiv className="map">
      <NaverMap defaultCenter={new navermaps.LatLng(coordinate)} defaultZoom={16}>
        <Marker position={coordinate} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;

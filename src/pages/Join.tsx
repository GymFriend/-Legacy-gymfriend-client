import React, { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { GymInfo } from "../models/Gym";

const Join = (): ReactElement => {
  const location = useLocation();
  const gymInfo: GymInfo = location.state.gymInfo;

  return <div className="join page">{gymInfo.title}</div>;
};

export default Join;

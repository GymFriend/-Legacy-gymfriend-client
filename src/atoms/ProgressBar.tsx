import React, { ReactElement } from "react";

interface Props {
  width: number;
}

const ProgressBar = ({ width }: Props): ReactElement => {
  return (
    <div className="progressbar">
      <div className="progressbar__value" style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default ProgressBar;

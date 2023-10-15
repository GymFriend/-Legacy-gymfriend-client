import React, { ReactElement } from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const PrimaryBtn = ({ label, onClick }: Props): ReactElement => {
  return (
    <button className="primary-btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryBtn;

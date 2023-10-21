import React, { CSSProperties, ReactElement } from "react";

interface Props {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
  activate: boolean;
}

const ToggleBtn = ({ label, onClick, style, activate }: Props): ReactElement => {
  return (
    <button className={`toggle-btn ${activate && "toggle-btn--activate"}`} onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default ToggleBtn;

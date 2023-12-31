import React, { CSSProperties, ReactElement } from "react";

interface Props {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
  activate: boolean;
}

const UnderlineBtn = ({ label, onClick, style, activate }: Props): ReactElement => {
  return (
    <button className={`underline-btn ${activate && "underline-btn--activate"}`} onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default UnderlineBtn;

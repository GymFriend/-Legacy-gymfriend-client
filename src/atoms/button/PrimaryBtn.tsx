import React, { ReactElement } from "react";
import { WidgetColor, WidgetColorType, WidgetSize, WidgetSizeType } from "../../utils/types";

interface Props {
  label: string;
  onClick: () => void;
  widgetSize: WidgetSizeType;
  widgetColor: WidgetColorType;
}

const PrimaryBtn = ({ label, onClick, widgetSize, widgetColor }: Props): ReactElement => {
  const size = (): string => {
    return widgetSize === WidgetSize.big ? "big" : "small";
  };

  const color = (): string => {
    switch (widgetColor) {
      case WidgetColor.appColor:
        return "appColor";
      case WidgetColor.grey:
        return "grey";
    }
  };

  return (
    <button className={`primary-btn primary-btn--${size()} primary-btn--${color()}`} onClick={onClick} style={{ width: widgetSize === WidgetSize.big ? "100%" : undefined }}>
      {label}
    </button>
  );
};

export default PrimaryBtn;

import React, { useCallback, CSSProperties } from "react";

const defaultStyle: CSSProperties = {
  height: "50px",
  width: "100px",
  padding: "5px",
  border: 0,
  borderRight: "1px solid #d3d3d3",
  borderBottom: "1px solid #d3d3d3",
  background: "none",
  lineHeight: "30px",
  textAlign: "center",
  textTransform: "uppercase",
  transitionProperty: "background",
  transitionDuration: "100ms",
  transitionTimingFunction: "linear"
};

export const activeStyle: CSSProperties = {
  background: "#f7f7f7",
  fontWeight: "bold"
};

interface LocaleButtonProps {
  locale: string;
  active?: boolean;
  onClick(locale: string): void;
}

const LocaleButton: React.FC<LocaleButtonProps> = props => {
  const handleClick = useCallback(
    event => {
      event.preventDefault();
      props.onClick(props.locale);
    },
    [props.locale]
  );

  return (
    <button
      type="button"
      style={{
        ...defaultStyle,
        ...(props.active ? activeStyle : {})
      }}
      onClick={handleClick}
    >
      {props.locale}
    </button>
  );
};

export default LocaleButton;

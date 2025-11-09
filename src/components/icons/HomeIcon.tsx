import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.819 1.614a1.333 1.333 0 00-1.637 0l-12 9.334A1.333 1.333 0 002.666 12v14.667a2.667 2.667 0 002.666 2.666h21.334a2.667 2.667 0 002.666-2.666V12c0-.411-.19-.8-.514-1.052l-12-9.334zm4.514 25.053h5.334V12.652L16 4.356 5.333 12.652v14.015h5.334V16c0-.736.597-1.333 1.333-1.333h8c.736 0 1.333.597 1.333 1.333v10.667zm-8 0v-9.334h5.334v9.334h-5.334z"
        fill={props.fill || "#2B2D42"}
      />
    </Svg>
  );
}

export default SvgComponent;

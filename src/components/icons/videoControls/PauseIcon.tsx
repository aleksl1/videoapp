import { COLORS } from "@/src/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M13.44 8.218a3.84 3.84 0 10-7.68 0v15.36a3.84 3.84 0 107.68 0V8.218zM26.24 8.218a3.84 3.84 0 10-7.68 0v15.36a3.84 3.84 0 107.68 0V8.218z"
        stroke={props.stroke || COLORS.white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

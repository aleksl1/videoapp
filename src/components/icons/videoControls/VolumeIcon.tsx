import { COLORS } from "@/src/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.404 4.085A1 1 0 0116 5v22a1 1 0 01-1.673.74L7.28 21.333H3.667A2.333 2.333 0 011.333 19v-6a2.334 2.334 0 012.334-2.333H7.28l7.047-6.407a1 1 0 011.077-.173v-.002zM14 7.26l-5.66 5.147a1 1 0 01-.673.26h-4a.333.333 0 00-.334.333v6c0 .184.15.333.334.333h4a1 1 0 01.673.26L14 24.74V7.26z"
        fill={props.stroke || COLORS.white}
      />
      <Path
        d="M24.957 5.63a1 1 0 011.414 0c5.728 5.727 5.728 15.013 0 20.74a1 1 0 01-1.414-1.413 12.668 12.668 0 000-17.914 1 1 0 010-1.414z"
        fill={props.stroke || COLORS.white}
      />
      <Path
        d="M21.657 10.343a1.001 1.001 0 00-1.414 1.414 6 6 0 010 8.486 1 1 0 001.413 1.413 8 8 0 00.001-11.313z"
        fill={props.stroke || COLORS.white}
      />
    </Svg>
  );
}

export default SvgComponent;

import { COLORS } from "@/src/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M22.211 12.382c1.92 1.2 2.88 1.8 3.209 2.568.287.67.287 1.43 0 2.1-.33.768-1.29 1.368-3.209 2.568l-9.016 5.635c-2.13 1.332-3.196 1.998-4.075 1.927a2.666 2.666 0 01-1.927-1.068c-.526-.708-.526-1.964-.526-4.477v-11.27c0-2.513 0-3.769.526-4.477A2.667 2.667 0 019.12 4.82c.879-.07 1.944.595 4.075 1.927l9.016 5.635z"
        stroke={props.stroke || COLORS.white}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

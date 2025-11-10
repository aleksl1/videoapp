import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M9.333 28L16 22.667 22.667 28M10.4 22.667h11.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748c.436-.856.436-1.976.436-4.216V10.4c0-2.24 0-3.36-.436-4.216a4 4 0 00-1.748-1.748C24.96 4 23.84 4 21.6 4H10.4c-2.24 0-3.36 0-4.216.436a4 4 0 00-1.748 1.748C4 7.04 4 8.16 4 10.4v5.867c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748c.856.436 1.976.436 4.216.436z"
        stroke={props.stroke || "#2B2D42"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

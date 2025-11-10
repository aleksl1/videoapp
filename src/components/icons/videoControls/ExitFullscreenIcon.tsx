import { COLORS } from "@/src/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ExitFullscreenIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M5.333 12H12V5.333M26.667 12H20V5.333M20 26.667h6.667V20M12 26.667H5.333V20"
        stroke={props.stroke || COLORS.white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ExitFullscreenIcon;

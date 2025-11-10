import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { COLORS } from "@/src/constants/theme";

function VolumeMuteIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M14.667 5.333L8 12H2.667v8H8l6.667 6.667V5.333zM24 16l4-4-2.667-2.667-4 4-4-4L14.667 12l4 4-4 4 2.666 2.667 4-4 4 4L28 20l-4-4z"
        fill={props.stroke || COLORS.white}
      />
    </Svg>
  );
}

export default VolumeMuteIcon;


import { COLORS } from "@/src/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M6.667 22.649c-.437-.023-.749-.073-1.02-.185a2.667 2.667 0 01-1.444-1.443C4 20.53 4 19.909 4 18.667V9.6c0-1.493 0-2.24.29-2.81.256-.502.664-.91 1.166-1.166.57-.29 1.317-.29 2.81-.29h15.467c1.494 0 2.24 0 2.811.29.502.256.91.664 1.165 1.165C28 7.36 28 8.107 28 9.6v9.067c0 1.242 0 1.863-.203 2.354a2.668 2.668 0 01-1.443 1.443c-.272.112-.584.162-1.02.185m-13.146 4.018h7.624c.753 0 1.13 0 1.304-.167a.738.738 0 00.215-.583c-.017-.256-.284-.554-.816-1.15L16.703 20.5c-.246-.276-.37-.413-.511-.465a.56.56 0 00-.384 0c-.142.052-.265.19-.51.465l-3.813 4.268c-.532.596-.798.894-.816 1.15a.738.738 0 00.215.583c.175.167.551.167 1.304.167z"
        stroke={props.stroke || COLORS.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;

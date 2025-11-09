import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M11.482 24.858v-7.079M2.921 16.218a4.274 4.274 0 118.538 0v7.206a4.276 4.276 0 11-8.538 0v-7.206z"
        stroke={props.stroke || "#2B2D42"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.483 23.424a4.289 4.289 0 004.262 4.314h5.274a5.683 5.683 0 005.452-4.096l1.92-6.503a2.882 2.882 0 00-2.688-3.84h-7.065V6.541a1.87 1.87 0 00-1.856-1.882 1.856 1.856 0 00-1.78 1.357l-3.52 11.725"
        stroke={props.stroke || "#2B2D42"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;

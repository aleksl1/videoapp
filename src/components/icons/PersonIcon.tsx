import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_27_468)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.5 28.8H5.501c-1.13 0-1.965-1.115-1.538-2.14C5.94 21.916 10.587 19.2 16 19.2c5.414 0 10.06 2.717 12.039 7.46.426 1.025-.409 2.14-1.539 2.14zM9.467 9.6c0-3.53 2.931-6.4 6.533-6.4 3.603 0 6.533 2.87 6.533 6.4 0 3.53-2.93 6.4-6.533 6.4-3.602 0-6.533-2.87-6.533-6.4zm22.462 18.618c-1.187-5.375-4.901-9.341-9.79-11.141 2.59-2.044 4.101-5.348 3.546-8.965-.643-4.197-4.207-7.555-8.51-8.045C11.238-.61 6.2 3.918 6.2 9.6c0 3.024 1.43 5.718 3.662 7.477-4.89 1.8-8.603 5.766-9.792 11.14C-.36 30.172 1.246 32 3.286 32h25.427c2.042 0 3.649-1.829 3.216-3.782z"
          fill={props.fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_27_468">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;

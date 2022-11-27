import React, { useContext } from "react";
import { ImageSliderContext } from "../../ImageSlider";
import Dot from "../Dot/Dot";

const Dots = () => {
  const { slidesCount } = useContext(ImageSliderContext);

  return (
    <div className="dots">
      {new Array(slidesCount).fill(null).map((_, index) => (
        <Dot key={`dot-${index}`} number={index} />
      ))}
    </div>
  );
};

export default Dots;

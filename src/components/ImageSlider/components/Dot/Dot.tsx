import React, { useContext } from "react";
import { ImageSliderContext } from "../../ImageSlider";

interface IDotProps {
  number: number;
}

const Dot = ({ number }: IDotProps) => {
  const { goToSlide, slideNumber } = useContext(ImageSliderContext);

  return (
    <div
      className={`dot ${slideNumber === number ? "selected" : ""}`}
      onClick={() => goToSlide(number)}
    />
  );
};

export default Dot;

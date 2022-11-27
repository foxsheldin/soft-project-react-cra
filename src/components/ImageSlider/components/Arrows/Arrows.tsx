import React, { useContext } from "react";
import { ImageSliderContext } from "../../ImageSlider";

type Props = {};

const Arrows = (props: Props) => {
  const { changeSlide } = useContext(ImageSliderContext);

  return (
    <div className="arrows">
      <div className="arrow left" onClick={() => changeSlide(-1)} />
      <div className="arrow right" onClick={() => changeSlide(1)} />
    </div>
  );
};

export default Arrows;

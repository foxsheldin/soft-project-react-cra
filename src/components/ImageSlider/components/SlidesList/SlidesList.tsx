import React, { useContext } from "react";
import { ImageSliderContext } from "../../ImageSlider";
import Slide from "../Slide/Slide";

const SlidesList = () => {
  const { slideNumber, photos } = useContext(ImageSliderContext);
  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {photos.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  );
};

export default SlidesList;

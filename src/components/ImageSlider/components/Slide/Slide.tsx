import React, { useContext } from "react";
import { ImageSliderContext } from "../../ImageSlider";

interface ISlideProps {
  data: { url: string; title: string };
}

const Slide = ({ data: { url, title } }: ISlideProps) => {
  const { isTitleVisible } = useContext(ImageSliderContext);
  return (
    <div className="slide">
      <img src={url} alt={title} className="slide-image" />
      {isTitleVisible && <div className="slide-title">{title}</div>}
    </div>
  );
};

export default Slide;

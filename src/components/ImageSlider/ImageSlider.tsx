import React, { createContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPhotos } from "../../store/photo";
import { selectPhotoByAlbumId } from "../../store/photo/selectors";
import { IPhotoResponseData } from "../../store/photo/types";
import Arrows from "./components/Arrows/Arrows";
import Dots from "./components/Dots/Dots";
import SlidesList from "./components/SlidesList/SlidesList";
import "./styles.scss";
import { IImageSliderContext, IImageSliderProps } from "./types";

export const ImageSliderContext = createContext({} as IImageSliderContext);

const ImageSlider = ({
  albumId,
  width = "100%",
  height = "100%",
  autoPlay = true,
  autoPlayTime = 3000,
  isTitleVisible = true,
  isDotsVisible = true,
  isArrowVisible = true,
}: IImageSliderProps) => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) =>
    selectPhotoByAlbumId(state, { albumId })
  );
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const inteval = setInterval(() => {
      changeSlide();
    }, autoPlayTime);

    return () => {
      clearInterval(inteval);
    };
  }, [photos.length, slide]);

  const changeSlide = (direction: number = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = photos.length - 1;
    } else {
      slideNumber = (slide + direction) % photos.length;
    }

    setSlide(slideNumber);
  };

  const goToSlide = (number: number) => {
    setSlide(number % photos.length);
  };

  return (
    <div className="slider" style={{ width, height }}>
      <ImageSliderContext.Provider
        value={{
          photos: photos as IPhotoResponseData[],
          slideNumber: slide,
          slidesCount: photos.length,
          changeSlide,
          goToSlide,
          isTitleVisible,
        }}
      >
        {isArrowVisible && <Arrows />}
        <SlidesList />
        {isDotsVisible && <Dots />}
      </ImageSliderContext.Provider>
    </div>
  );
};

export default ImageSlider;

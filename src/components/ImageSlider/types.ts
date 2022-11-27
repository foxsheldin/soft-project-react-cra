import { IPhotoResponseData } from "../../store/photo/types";

export interface IImageSliderProps {
  albumId: number;
  width?: string;
  height?: string;
  autoPlay?: boolean;
  autoPlayTime?: number;
  isTitleVisible?: boolean;
  isDotsVisible?: boolean;
  isArrowVisible?: boolean;
}

export interface IImageSliderContext {
  slideNumber: number;
  slidesCount: number;
  photos: Array<IPhotoResponseData>;
  changeSlide: (direction?: number) => void;
  goToSlide: (number: number) => void;
  isTitleVisible: boolean;
}

import React from "react";
import { Card, Col } from "react-bootstrap";
import ImageSlider from "../ImageSlider/ImageSlider";
import { IAlbumListItemProps } from "./types";

const AlbumListItem = ({ albumId, title }: IAlbumListItemProps) => {
  return (
    <Col>
      <Card className="w-100">
        <ImageSlider
          albumId={albumId}
          isTitleVisible={false}
          isDotsVisible={false}
          isArrowVisible={false}
        />
        <Card.Body>{title}</Card.Body>
      </Card>
    </Col>
  );
};

export default AlbumListItem;

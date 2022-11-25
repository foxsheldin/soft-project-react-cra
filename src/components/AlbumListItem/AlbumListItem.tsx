import React from "react";
import { Card, Col } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectPhotoByAlbumId } from "../../store/photo/selectors";
import { IAlbumListItemProps } from "./types";

const AlbumListItem = ({ albumId, title }: IAlbumListItemProps) => {
  const photos = useAppSelector((state) =>
    selectPhotoByAlbumId(state, { albumId })
  );

  return (
    <Col>
      <Card className="w-100">
        <Card.Img variant="top" src={photos[0]?.url} />
        <Card.Body>{title}</Card.Body>
      </Card>
    </Col>
  );
};

export default AlbumListItem;

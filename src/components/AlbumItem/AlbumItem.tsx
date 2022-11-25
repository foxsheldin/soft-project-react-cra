import React from "react";
import { Card, Col } from "react-bootstrap";
import { IAlbumItemProps } from "./types";

const AlbumItem = ({ src, title }: IAlbumItemProps) => {
  return (
    <Col>
      <Card className="w-100">
        <Card.Img variant="top" src={src} />
        <Card.Body>{title}</Card.Body>
      </Card>
    </Col>
  );
};

export default AlbumItem;

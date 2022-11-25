import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPhotos } from "../../store/photo";
import { selectPhotoByAlbumId } from "../../store/photo/selectors";

type Props = {};

const AlbumPage = (props: Props) => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) =>
    selectPhotoByAlbumId(state, { albumId: parseInt(albumId as string) })
  );

  useEffect(() => {
    dispatch(fetchPhotos());
  }, []);

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
        {photos?.map((photo) => (
          <AlbumItem
            key={photo?.id}
            src={photo?.url as string}
            title={photo?.title}
          />
        ))}
      </Row>
    </Container>
  );
};

export default AlbumPage;

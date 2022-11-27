import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlbumListItem from "../../components/AlbumListItem/AlbumListItem";
import { fetchAlbums } from "../../store/album";
import { selectAlbumArrayEntities } from "../../store/album/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPhotos } from "../../store/photo";

const AlbumListPage = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbumArrayEntities);

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchPhotos());
  }, []);

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
        {albums?.map((album) => (
          <Link
            key={album?.id}
            to={album?.id.toString() as string}
            className="d-flex"
          >
            <AlbumListItem albumId={album?.id as number} title={album?.title} />
          </Link>
        ))}
      </Row>
    </Container>
  );
};

export default AlbumListPage;

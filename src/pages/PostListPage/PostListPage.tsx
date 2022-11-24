import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "../../components/User/User";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPosts } from "../../store/post";
import {
  selectIsPostLoading,
  selectPostArrayEntities,
} from "../../store/post/selectors";

const PostListPage = () => {
  const dispatch = useAppDispatch();
  const isPostLoading = useAppSelector(selectIsPostLoading);
  const posts = useAppSelector(selectPostArrayEntities);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isPostLoading) {
    return (
      <Container>
        <div style={{ textAlign: "center" }}>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Row xs={1} className="g-4">
        {posts.map((post) => (
          <Col key={post?.id}>
            <Card className="w-100">
              <Card.Header>
                <Card.Title>{post?.title}</Card.Title>
              </Card.Header>
              <Card.Body>
                {post?.body.split("\n").map((item, index) => (
                  <span key={`${post.id}_${index}`}>
                    {item}
                    <br />
                  </span>
                ))}
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between">
                  <div>
                    <User userId={post?.userId} />
                  </div>
                  <div>
                    <Link to={`${post?.id}`} className="disabled">
                      Comments
                    </Link>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostListPage;

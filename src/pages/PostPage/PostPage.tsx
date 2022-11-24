import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import User from "../../components/User/User";
import { fetchCommentsByPostId } from "../../store/comment";
import {
  selectCommentByPostId,
  selectIsCommentLoading,
} from "../../store/comment/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPosts } from "../../store/post";
import {
  selectIsPostLoading,
  selectPostById,
} from "../../store/post/selectors";

const PostPage = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const isPostLoading = useAppSelector(selectIsPostLoading);
  const isCommentLoading = useAppSelector(selectIsCommentLoading);
  const post = useAppSelector((state) =>
    selectPostById(state, { postId: postId as string })
  );
  const comments = useAppSelector((state) =>
    selectCommentByPostId(state, { postId: postId as string })
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId as string));
  }, [postId]);

  if (isPostLoading || isCommentLoading) {
    return (
      <Container>
        <div style={{ textAlign: "center" }}>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <section>
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
            <div>
              <User userId={post?.userId.toString()} />
            </div>
          </Card.Footer>
        </Card>
      </section>
      <section>
        <h3 className="my-4">Comments</h3>
        <Row xs={1} className="g-2">
          {comments.map((comment) => (
            <Col key={`comment_${comment?.id}`}>
              <Card>
                <Card.Header>{comment?.name}</Card.Header>
                <Card.Body>{comment?.body}</Card.Body>
                <Card.Footer>
                  <div>Comment from: {comment?.email}</div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default PostPage;

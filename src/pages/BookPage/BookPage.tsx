import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { getBook } from "../../services/bookService";
import parse from "html-react-parser";

import "./BookPage.css";

export default function BookPage() {
  const { id } = useParams();
  useEffect(() => {
    const fetchBookData = async () => {
      if (!id) return;
      const result = await getBook(id);
      setVolumeInfo(result);
    };
    fetchBookData();
  }, [id]);

  const [volumeInfo, setVolumeInfo] = useState<undefined | VolumeInfo>();
  if (!volumeInfo) return <div>Loading!</div>;

  const categoriesText = volumeInfo.categories ? volumeInfo.categories[0] : "";
  const authorsText = volumeInfo.authors ? volumeInfo.authors.join(", ") : "";
  const description = volumeInfo.description
    ? parse(volumeInfo.description)
    : "";

  return (
    <Container fluid>
      <Card className="book_page">
        <Row>
          <Col xs={6} className="d-flex justify-content-center col-img">
            <Card.Img
              src={volumeInfo.imageLinks.thumbnail || ""}
              className="book_page__img"
            />
          </Col>
          <Col xs={6}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-4">
                {categoriesText}
              </Card.Subtitle>
              <Card.Title className="book_page__title mb-4">
                {volumeInfo.title}
              </Card.Title>
              <Card.Subtitle className="text-muted mb-4">
                {authorsText}
              </Card.Subtitle>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

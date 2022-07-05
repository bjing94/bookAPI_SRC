import React from "react";
import { Card } from "react-bootstrap";

import "./BookCard.css";

interface BookCardProps {
  title: string;
  categories?: string[];
  authors?: string[];
  imgSrc?: string;
}
export default function BookCard({
  title,
  categories = [""],
  authors = [""],
  imgSrc = "",
}: BookCardProps) {
  const categoriesText = categories.join(",");
  const authorsText = authors.join(",");
  return (
    <Card className="book-card">
      <Card.Body>
        <Card.Img variant="top" src={imgSrc} className="book-card__img" />
        <Card.Subtitle className="text-muted">{categoriesText}</Card.Subtitle>
        <Card.Title className="book-card__title">{title}</Card.Title>
        <Card.Subtitle className="text-muted">{authorsText}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

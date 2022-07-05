import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import BookCard from "../components/BookCard/BookCard";
import bookStore from "../store/bookStore";
import errorStore from "../store/errorStore";

function HomePage() {
  const handleLoadMore = () => {
    try {
      bookStore.fetchMoreBooks();
    } catch (e: any) {
      errorStore.setErrorMessage(e.message);
    }
  };

  const cardElements = bookStore.books?.items
    ? bookStore.books.items.map((data) => {
        return (
          <Link to={`/book/${data.id}`}>
            <BookCard
              title={data.volumeInfo.title}
              authors={data.volumeInfo.authors}
              categories={data.volumeInfo.categories}
              imgSrc={data.volumeInfo.imageLinks?.thumbnail || ""}
              key={data.etag}
            />
          </Link>
        );
      })
    : null;

  return (
    <>
      {!bookStore.isLoading && bookStore.books && (
        <>
          <h4>Found {bookStore.books.totalItems} results</h4>
          {bookStore.books?.items && (
            <>
              <Container fluid="xs" className="main-container p-4">
                {cardElements}
              </Container>
              {!bookStore.isLoadingMore && (
                <>
                  <h3>
                    {bookStore.startIndex + 30} of {bookStore.books.totalItems}
                  </h3>
                  <Button className="mb-4" onClick={handleLoadMore}>
                    Load more
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
      {bookStore.isLoading && <div>Loading!</div>}
    </>
  );
}

export default observer(HomePage);

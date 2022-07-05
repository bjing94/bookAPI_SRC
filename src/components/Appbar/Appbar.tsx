import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Container,
  Row,
  InputGroup,
  Button,
  Col,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import bookStore from "../../store/bookStore";
import errorStore from "../../store/errorStore";
import { useNavigate } from "react-router";

import "./Appbar.css";

function Appbar() {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await bookStore.fetchBooks(searchValue, category, orderBy);
      navigate("/");
    } catch (e: any) {
      errorStore.setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await bookStore.fetchBooks(searchValue, category, orderBy);
        navigate("/");
      } catch (e: any) {
        errorStore.setErrorMessage(e.message);
      }
    };
    fetchData();
  }, [category, orderBy]);

  return (
    <Container fluid="xs" className="p-4 hero m-0 mb-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Container>
          <Row>
            <h1>Search for books</h1>
          </Row>
          <Row>
            <InputGroup className="mb-4">
              <input
                placeholder="Search for books"
                type="text"
                className="form-control"
                id="searchInput"
                value={searchValue}
                onInput={(event) => {
                  setSearchValue(event.currentTarget.value);
                }}
              />
              <Button type="submit">&#128269;</Button>
            </InputGroup>
          </Row>
          <Row>
            <Col>
              <div className="d-flex align-items-center">
                <label htmlFor="category-dropdown" className="dropdown-label">
                  Categories
                </label>
                <DropdownButton
                  title={category}
                  id="category-dropdown"
                  as={ButtonGroup}
                  className="my-dropdown"
                >
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("all");
                    }}
                  >
                    all
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("art");
                    }}
                  >
                    art
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("biography");
                    }}
                  >
                    biography
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("computers");
                    }}
                  >
                    computers
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("history");
                    }}
                  >
                    history
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("medical");
                    }}
                  >
                    medical
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCategory("poetry");
                    }}
                  >
                    poetry
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <label htmlFor="order-dropdown" className="dropdown-label">
                  Order by
                </label>
                <DropdownButton
                  title={orderBy}
                  id="order-dropdown"
                  as={ButtonGroup}
                  className="my-dropdown"
                  type="submit"
                >
                  <Dropdown.Item
                    onClick={() => {
                      setOrderBy("relevance");
                    }}
                  >
                    relevance
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrderBy("newest");
                    }}
                  >
                    newest
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </Container>
  );
}

export default observer(Appbar);

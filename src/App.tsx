import React from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import Appbar from "./components/Appbar";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Appbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
export default observer(App);

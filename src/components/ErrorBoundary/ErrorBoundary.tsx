import React from "react";
import { observer } from "mobx-react-lite";
import errorStore from "../../store/errorStore";

const ErrorBoundary = ({ children }: any) => {
  if (errorStore.errorMessage !== "") {
    return <h1>{errorStore.errorMessage}</h1>;
  }
  return children;
};

export default observer(ErrorBoundary);

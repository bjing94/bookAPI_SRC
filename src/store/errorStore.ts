import { makeAutoObservable } from "mobx";

class ErrorStore {
  errorMessage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setErrorMessage(value: string) {
    this.errorMessage = value;
  }
}

const errorStore = new ErrorStore();
export default errorStore;

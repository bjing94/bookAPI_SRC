import axios from "axios";

const KEY = "AIzaSyAA6FVQK5mdRglZX6gFvxn4xXUEjrZR7Pc";
// const KEY = "AIzaSyAA6FVQK5mdRglZX6gFvxn4xXUEjrZR7Pg";
const axiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
  params: {
    key: KEY,
  },
});

export default axiosInstance;

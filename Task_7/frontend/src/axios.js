import axios from "axios";

const instance = axios.create({
  // Base URL for API requests
  baseURL: "http://localhost:8080",
});

export default instance;

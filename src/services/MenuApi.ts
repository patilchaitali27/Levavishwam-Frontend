import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:44315/api",
});

export default API;

import axios from "axios";

const api = axios.create({
  baseURL: " 0.0.0.0:5900/api/",
  timeout: 5000,
});

export default api;

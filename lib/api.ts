import axios from "axios";

const api = axios.create({
  timeout: 10000,
  baseURL: process.env.API_URL || "http://127.0.0.1:8001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

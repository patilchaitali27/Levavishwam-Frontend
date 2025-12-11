// src/services/api.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://localhost:44315/";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  } catch {}
  return config;
});

export default api;

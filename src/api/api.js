import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://movienew.cybersoft.edu.vn/api";
const CYBERSOFT_TOKEN = import.meta.env.VITE_CYBERSOFT_TOKEN;

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  if (CYBERSOFT_TOKEN) config.headers["TokenCybersoft"] = CYBERSOFT_TOKEN;
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default api;

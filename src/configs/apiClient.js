import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/gyconverse/api"
    : "http://localhost:5000/gyconverse/api";

const apiClient = axios.create({
  baseURL,
});

export const fileUri = (fileName) => `${baseURL}/file/${fileName}`;

export default apiClient;

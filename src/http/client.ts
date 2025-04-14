import axios from "axios";

// This file is used to create an axios instance with a base URL and default headers.
// It is used to make API requests to the backend server.
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

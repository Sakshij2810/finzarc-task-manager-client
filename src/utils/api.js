import axios from "axios";

const API = axios.create({
  baseURL: "https://finzarc-task-manager-server.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    // Ensure array responses are always arrays
    if (Array.isArray(response.data)) {
      return response;
    }
    if (response.data && typeof response.data === "object") {
      return response;
    }
    return {
      ...response,
      data: [],
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

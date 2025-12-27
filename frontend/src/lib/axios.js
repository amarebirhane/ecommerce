import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include Clerk token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Remove Content-Type header for FormData so browser can set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    // Only add token if we're in a browser environment and Clerk is available
    if (typeof window !== "undefined") {
      try {
        // Access Clerk from window object (available after ClerkProvider initializes)
        const clerk = window.Clerk;
        if (clerk && clerk.session) {
          const token = await clerk.session.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        // If Clerk is not available or token retrieval fails, continue without token
        // This is expected for unauthenticated requests or when Clerk isn't initialized yet
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

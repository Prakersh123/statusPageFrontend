/*
 *Filename: /home/codestax/statusPage/vite-project/src/lib/axiosHelper.js      *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Saturday, February 1st 2025, 6:43:43 pm                        *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3006/api/v1", // Replace with your API base URL
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses globally
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      const { status, data } = error.response;
      console.error(`API Error [${status}]:`, data);

      if (status === 401) {
        alert("Unauthorized! Redirecting to login...");
        window.location.href = "/login";
      } else if (status === 403) {
        alert("Forbidden! You don’t have permission.");
      } else if (status === 500) {
        alert("Server error! Try again later.");
      }
    } else if (error.request) {
      console.error("No response from server:", error.request);
      alert("Network error! Please check your connection.");
    } else {
      console.error("Axios error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

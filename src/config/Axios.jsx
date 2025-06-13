import axios from "axios";

// Create Axios instance
export const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    timeout: 10000,
});

// Attach token on every request
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `${token}`; // you are passing raw token, not "Bearer "
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Global response error handling
http.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (response && response.status === 401) {
            console.warn("Unauthorized: invalid or expired token");
            // Optionally clear invalid token
            localStorage.removeItem("accessToken");
            // Redirect to login page
            window.location.href = "/login";
        }

        return Promise.reject(response?.data || error);
    }
);

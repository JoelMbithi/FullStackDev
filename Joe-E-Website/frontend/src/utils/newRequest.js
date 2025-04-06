import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// Add a request interceptor
newRequest.interceptors.request.use(
    (config) => {
        // You can modify the config before the request is sent
        // For example, add an auth token if it exists
        const token = localStorage.getItem("token"); // or from your auth context
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);


export default newRequest;
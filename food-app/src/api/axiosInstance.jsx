import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8082/",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    // 1. Get the 'user' object string
    const data = localStorage.getItem("user");
    
    if (data) {
        // 2. Parse the string into an object
        const authObject = JSON.parse(data);
        // 3. Extract the 'token' property
        const token = authObject.token;
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url = error.config.url;
            if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Ensure this matches your Laravel API URL
    headers: {
        'Content-Type': 'application/json', // The default content type for the API requests
    },
});

// Interceptor to automatically attach the auth token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token'); // Get the token from localStorage
        if (token) {
            // Attach the token to the Authorization header if it exists
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config; // Return the modified config
    },
    (error) => {
        return Promise.reject(error); // If there's an error in the request, reject it
    }
);

// Interceptor to handle the response and any errors
api.interceptors.response.use(
    (response) => {
        return response; // Return the successful response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle Unauthorized (401) error (e.g., token expired)
            console.error('Unauthorized: Please log in again.');
            localStorage.removeItem('auth_token'); // Clear token from localStorage
            window.location.href = '/login'; // Redirect to the login page
        }
        return Promise.reject(error); // Reject other errors
    }
);

export default api;

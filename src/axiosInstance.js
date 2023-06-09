// src/axiosInstance.js

import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${REACT_APP_API_URL}`, // Replace with your backend base URL
  timeout: 30000, // Optional: set a request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

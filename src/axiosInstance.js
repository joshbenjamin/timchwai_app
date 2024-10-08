// src/axiosInstance.js

import axios from 'axios';

const API_URL = process.env.API_URL || "https://api.timchwai.co.za";

const axiosInstance = axios.create({
  baseURL: `${API_URL}`, // Replace with your backend base URL
  timeout: 30000, // Optional: set a request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

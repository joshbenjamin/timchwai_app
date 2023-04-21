// src/axiosInstance.js

import axios from 'axios';

require('dotenv').config();
const API_URL = process.env.API_URL;


const axiosInstance = axios.create({
  baseURL: `http://${API_URL}`, // Replace with your backend base URL
  timeout: 5000, // Optional: set a request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

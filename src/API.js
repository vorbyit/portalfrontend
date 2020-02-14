import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8001/',
  withCredentials: true,
});
API.interceptors.response.use((response) => response, (error) => {
  if (error.status === 401) {
    console.log('Got 401');
  }
  return Promise.reject(error);
});

export default API;

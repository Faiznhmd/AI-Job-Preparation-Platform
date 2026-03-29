import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000', // your backend
});

// LOGIN API
export const loginUser = async (data) => {
  return await API.post('/auth/login', data);
};

// REGISTER API
export const registerUser = async (data) => {
  return await API.post('/auth/register', data);
};

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000', // your backend
});

// LOGIN API
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post('/auth/login', data);

  console.log("LOGIN RESPONSE:", res.data); // 👈 check this once

  // ✅ IMPORTANT: store correct field
  const token = res.data.access_token; // 👈 MUST match backend

  localStorage.setItem("token", token);

  return res.data;
};

// REGISTER API
export const registerUser = async (data) => {
  return await API.post('/auth/register', data);
};

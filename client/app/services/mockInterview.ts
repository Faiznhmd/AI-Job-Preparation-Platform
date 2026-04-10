import axios from 'axios';

const API = 'http://localhost:4000/mock-interview';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const startInterview = async (data: {
  role: string;
  level: string;
  techStack: string[];
}) => {
  const res = await axios.post(`${API}/start`, data, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const sendAnswer = async (data: {
  interviewId: string;
  answer: string;
}) => {
  const res = await axios.post(`${API}/answer`, data, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const evaluateInterview = async (interviewId: string) => {
  const res = await axios.post(
    `${API}/evaluate`,
    { interviewId },
    {
      headers: getAuthHeader(),
    },
  );
  return res.data;
};

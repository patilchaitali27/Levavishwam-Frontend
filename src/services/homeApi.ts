import axios from "axios";

const API_URL = "https://localhost:44315/api/Home";

export const getCarousel = async () => {
  const res = await axios.get(`${API_URL}/carousel`);
  return res.data;
};

export const getEvents = async () => {
  const res = await axios.get(`${API_URL}/events`);
  return res.data;
};

export const getEventById = async (id: number) => {
  const res = await axios.get(`${API_URL}/events/${id}`);
  return res.data;
};

export const getNews = async () => {
  const res = await axios.get(`${API_URL}/news`);
  return res.data;
};

export const getNewsById = async (id: number) => {
  const res = await axios.get(`${API_URL}/news/${id}`);
  return res.data;
};


export const getDownloads = async () => {
  const res = await axios.get(`${API_URL}/downloads`);
  return res.data;
};

export const getCommittee = async () => {
  const res = await axios.get(`${API_URL}/committee`);
  return res.data;
};

export const getInformation = async () => {
  const res = await axios.get(`${API_URL}/information`);
  return res.data;
};


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});

export const login = (username: string, password: string) => {
  return api.post('token/', { username, password });
};

export const register = (username: string, email: string, password: string) => {
  return api.post('register/', { username, email, password });
};
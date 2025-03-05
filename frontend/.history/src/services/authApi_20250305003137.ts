import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});

// export const login = (username: string, password: string) => {
//   return api.post('token/', { username, password });
// };
export const login = async (username: string, password: string) => {
  const response = await api.post('token/', { username, password });  
  const { access, refresh } = response.data;
  localStorage.setItem('access_token', access);  
  localStorage.setItem('refresh_token', refresh);  
  return response;
};

// export const register = (username: string, email: string, password: string) => {
//   return api.post('register/', { username, email, password });
// };

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

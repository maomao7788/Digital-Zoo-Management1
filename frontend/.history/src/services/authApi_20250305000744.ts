import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});

export const login = async (credentials: object) => {
  const response = await api.post('auth/login/', credentials);
  const { token } = response.data;
  localStorage.setItem('token', token);  // ✅ 存储 Token
  return response;
};

// export const register = (username: string, email: string, password: string) => {
//   return api.post('register/', { username, email, password });
// };

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/zoo/api/',
// });

// export const login = (username: string, password: string) => {
//   return api.post('token/', { username, password });
// };

// // export const register = (username: string, email: string, password: string) => {
// //   return api.post('register/', { username, email, password });
// // };

// export const logout = () => {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
// };
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('token/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    const userResponse = await api.get('current-user/', {
      headers: { Authorization: `Bearer ${response.data.access}` },
    });
    localStorage.setItem('user_role', userResponse.data.role);
    localStorage.setItem('username', userResponse.data.username);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('username');
};

export const getUserRole = () => localStorage.getItem('user_role');
export const getUsername = () => localStorage.getItem('username');
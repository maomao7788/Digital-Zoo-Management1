import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export const getAnimals = () => api.get('animals/');
export const getAnimalById = (id: number) => api.get(`animals/${id}/`); 
export const createAnimal = (data: object) => api.post('animals/', data);
export const updateAnimal = (id: number, data: object) => api.put(`animals/${id}/`, data);
export const deleteAnimal = (id: number) => api.delete(`animals/${id}/`); 
export const getHabitats = () => api.get('habitats/');
export const createHabitat = (data: any) => api.post('habitats/', data);
export const updateHabitat = (id: number, data: any) => api.put(`habitats/${id}/`, data);
export const deleteHabitat = (id: number) => api.delete(`habitats/${id}/`);

export const getZookeepers = () => api.get('zookeepers/');
export const getZookeeperById = (id: number) => api.get(`zookeepers/${id}/`);
export const createZookeeper = (data: { user: number, role: string, qualifications: string, responsibilities: string, email: string }) => 
  api.post('zookeepers/', data);
export const updateZookeeper = (id: number, data: object) => api.put(`zookeepers/${id}/`, data);
export const deleteZookeeper = (id: number) => api.delete(`zookeepers/${id}/`);

export const getCareRoutines = async () => api.get('care-routines/');
export const createCareRoutine = async (data: object) => api.post('care-routines/', data);
export const deleteCareRoutine = async (id: number) => api.delete(`care-routines/${id}/`);

export const getTasks = async () => api.get('tasks/');
export const getTaskById = async (id: number) => api.get(`tasks/${id}/`);
export const createTask = async (data: object) => api.post('tasks/', data);
export const updateTaskStatus = async (id: number, status: string) =>api.put(`tasks/${id}/`, { status });
export const deleteTask = async (id: number) => api.delete(`tasks/${id}/`);

export const getActivityLogs = async () => api.get('activity-logs/');
export default api;

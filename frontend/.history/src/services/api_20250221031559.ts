import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});

export const getAnimals = () => api.get('animals/');
export const createAnimal = (data: any) => api.post('animals/', data);
export const deleteAnimal = (id: number) => api.delete(`animals/${id}/`);
export const getHabitats = () => api.get('habitats/');
export const getZookeepers = () => api.get('zookeepers/');
export const getCareRoutines = () => api.get('care_routines/');
export const assignCareRoutine = (data: any) => api.post('care_routines/', data);
export const getActivityLogs = () => api.get('activity_logs/');


export default api;

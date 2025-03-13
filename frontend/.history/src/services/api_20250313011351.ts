import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/zoo/api/',
});



api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
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
export const createZookeeper = (data: { user: number, role: string, qualifications: string, responsibilities: string, email: string }) => api.post('zookeepers/', data);
export const updateZookeeper = (id: number, data: object) => api.put(`zookeepers/${id}/`, data);
export const deleteZookeeper = (id: number) => api.delete(`zookeepers/${id}/`);
export const getCareRoutines = async () => api.get('care_routines/');
export const createCareRoutine = async (data: object) => api.post('care_routines/', data);
export const deleteCareRoutine = async (id: number) => api.delete(`care_routines/${id}/`);

export const getTasks = async () => api.get('tasks/');
export const getTaskById = async (id: number) => api.get(`tasks/${id}/`);
export const createTask = async (data: object) => api.post('tasks/', data);
export const updateTaskStatus = async (id: number, status: string) =>api.put(`tasks/${id}/`, { status });
export const deleteTask = async (id: number) => api.delete(`tasks/${id}/`);

export const getActivityLogs = async () => api.get('activity-logs/');
export const sendTaskEmail = (routineId: number) =>api.post(`send-task-email/${routineId}/`);
export const completeTask = (logId: number) => api.put(`complete-task/${logId}/`);
export const getUsers = () => api.get('users/');
export const getUserTasks = () => api.get('user-tasks/');  
export const registerUser = (data: { username: string; email: string; password: string }) =>api.post('register/', data);

export const getAllMemberships = () => api.get('memberships/');

export const getProfile = () => api.get('memberships/profile/'); // 只查询当前用户的会员信息
// export const applyMembership = (data: { tier: string }) => api.post('apply-membership/', data);
// export const getProfile = () => api.get('memberships/'); 
export const getMemberships = () => api.get('memberships/');
export const updateMembership = (id: number, data: object) => api.put(`memberships/${id}/`, data);
export const activateMembership = (id: number, active: boolean) =>api.patch(`memberships/${id}/activate/?active=${active}`);
export const applyMembership = (data: { tier: string }) => {return api.post("apply-membership/", data).catch(error => {console.error("Error applying for membership:", error.response?.data || error);throw error;});};

export const getEvents = () => api.get('events/');
export const createEvent = (data: object) => api.post('events/create/', data);
export const updateEvent = (id: number, data: object) => api.put(`events/${id}/`, data);
export const deleteEvent = (id: number) => api.delete(`events/${id}/`);

// Event Registration endpoints
export const applyEventRegistration = (data: { event: number }) => api.post('event-registrations/', data);
export const updateEventRegistration = (id: number, data: object) => api.put(`event-registrations/${id}/`, data);
export const getUserRegistrations = () => api.get('user-registrations/');

export const registerForEvent = (eventId: number) => api.post('registrations/', { event: eventId });
export const submitFeedback = (eventId: number, content: string) => api.post('feedbacks/', { event: eventId, content });
export const createFeedback = (data: object) => api.post('feedbacks/create/', data);



export default api;


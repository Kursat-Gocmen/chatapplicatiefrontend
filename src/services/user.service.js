import axios from 'axios';
import authHeader from './auth-header';

const ENDPOINTFORBOARD = 'http://localhost:8080/api/board/';

const ENDPOINTFORCHAT = 'http://localhost:8080/api/chat/';

const ENDPOINTFORADMIN = 'http://localhost:8080/usermanagement/'

//hier laat ik de board van de chat zelf zien die is ingelogd.
const getUserBoard = () => {
  return axios.get(ENDPOINTFORBOARD + 'user', { headers: authHeader() })
};

//hier laat ik de board van de admin zelf zien die is ingelogd.

const getAdminBoard = () => {
  return axios.get(ENDPOINTFORBOARD + 'admin', { headers: authHeader() })
};

// hier haal ik alle users op die bestaan in de database.
const getAllUsers = () => {
  return axios.get(ENDPOINTFORADMIN + 'users', { headers: authHeader() })
};

// hier verwijder ik een user uit de database.
const deleteUser = (userId) => {
  return axios.delete(`${ENDPOINTFORADMIN}${userId}`, { headers: authHeader() })
};

// hier haal ik alle users uit de database.
const searchUsers = () => {
  return axios.get(ENDPOINTFORADMIN + 'usernames', { headers: authHeader() });
};

// hier haal ik alle berichten uit de database.
const getPublicMessages = () => {
  return axios.get(ENDPOINTFORCHAT + 'messages', { headers: authHeader() });
};

// hier update ik de user uit de database.
const updateUser = (userId, updatedData) => {
  return axios.put(`${ENDPOINTFORADMIN}${userId}`, updatedData, { headers: authHeader() });
};

const UserService = {
  getAllUsers,
  deleteUser,
  getUserBoard,
  searchUsers,
  getAdminBoard,
  getPublicMessages,
  updateUser,
};

export default UserService;

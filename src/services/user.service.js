import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/board/';

//Andere endpoint gedaan omdat Read,Delete in een andere controller zit
const ENDPOINT = 'http://localhost:8080/usermanagement/'

//hier laat ik de board van de user zelf zien die is ingelogd
const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() })
};

//hier laat ik de board van de admin zelf zien die is ingelogd

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() })
};

// hier haal ik alle users op die bestaan in de database
const getAllUsers = () => {
  return axios.get(ENDPOINT + 'users', { headers: authHeader() })
};

// hier verwijder ik de user uit de database.
const deleteUser = (userId) => {
  return axios.delete(`${ENDPOINT}${userId}`, { headers: authHeader() })
};

const UserService = {
  getAllUsers,
  deleteUser,
  getUserBoard,
  getAdminBoard,
};

export default UserService;

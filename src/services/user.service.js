import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

//Andere endpoint gedaan omdat Read,Delete in een andere controller zit
const ENDPOINT = 'http://localhost:8080/users/'

//hier laat ik de board van de user zelf zien die is ingelogd
const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.replace('/login');
      }
      throw error; 
    });
};

//hier laat ik de board van de admin zelf zien die is ingelogd

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.replace('/login');
      }
      throw error;
    });
};

// hier haal ik alle users op die bestaan in de database
const getAllUsers = () => {
  return axios.get(ENDPOINT + 'getall', { headers: authHeader() })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.replace('/login');
      }
      throw error;
    });
};

// hier verwijder ik de user uit de database.
const deleteUser = (userId) => {
  return axios.delete(`${ENDPOINT}${userId}`, { headers: authHeader() })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.replace('/login');
      }
      throw error;
    });
};

const UserService = {
  getAllUsers,
  deleteUser,
  getUserBoard,
  getAdminBoard,
};

export default UserService;

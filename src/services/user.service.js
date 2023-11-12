import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.replace('/login');
      }
      throw error; 
    });
};


const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        window.location.replace('/login');
      }
      throw error;
    });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
}

export default UserService;
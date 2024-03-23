import axios from "axios";
import API_URL from "../constants";
import { UserRegister } from "../redux/interfaces/userInterface";
import { PropertyModel } from "../redux/interfaces/propertyInterface";

// Auth API calls
const registerUser = async (user: UserRegister) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const loginUser = async (user: UserRegister) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

// User API calls
const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const fetchUser = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const addUser = async (user: UserRegister) => {
  try {
    const response = await axios.post(`${API_URL}/user`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const updateUser = async (id: string, user: UserRegister) => {
  try {
    const response = await axios.put(`${API_URL}/user/${id}`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const updateUserProfile = async (user: UserRegister) => {
  try {
    const response = await axios.put(`${API_URL}/user/profile`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const deleteUserProfile = async () => {
  try {
    const response = await axios.delete(`${API_URL}/user/profile`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

// Property API calls
const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/prop`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const fetchProperty = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/prop/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const addProperty = async (property: PropertyModel) => {
  try {
    const response = await axios.post(`${API_URL}/prop`, property);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const updateProperty = async (id: string, property: PropertyModel) => {
  try {
    const response = await axios.put(`${API_URL}/prop/${id}`, property);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const deleteProperty = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/prop/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export {
  registerUser,
  loginUser,
  logout,
  fetchUsers,
  fetchUser,
  addUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  fetchProperties,
  fetchProperty,
  addProperty,
  updateProperty,
  deleteProperty,
};

import axios from "axios";
import API_URL from "../constants";
import { UserRegister } from "../redux/interfaces/userInterface";
import { PropertyModel } from "../redux/interfaces/propertyInterface";
import { AuthResponse } from "../redux/interfaces/authInterface";

const token = JSON.parse(localStorage.getItem("token") as string);

// Auth API calls
const registerUser = async (user: UserRegister) => {
  try {
    const response = await axios.post(`${API_URL}/user`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const loginUser = async (user: UserRegister) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, user);
    return response?.data;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

// User API calls
const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

const fetchUser = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

const updateUser = async (user: AuthResponse) => {
  try {
    const response = await axios.put(`${API_URL}/user`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

const fetchAllProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/prop`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

// Property API calls
const fetchProperties = async (page: string) => {
  try {
    const response = await axios.get(`${API_URL}/prop/get-paged${page}`);
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
    const response = await axios.post(`${API_URL}/prop`, property, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

const updateProperty = async (property: PropertyModel) => {
  try {
    const response = await axios.put(`${API_URL}/prop`, property, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return error;
  }
};

const deleteProperty = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/prop/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  fetchAllProperties,
  fetchProperties,
  fetchProperty,
  addProperty,
  updateProperty,
  deleteProperty,
};

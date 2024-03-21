import axios from 'axios';
import {
  USERS_URL,
  PROPERTY_URL,
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
} from './constants';
import { User } from '../redux/interfaces/userInterface';
import { Property } from '../redux/interfaces/propertyInterface';
import { Auth, RegisterModel } from '../redux/interfaces/authInterface';

export const getUsers = async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${USERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${USERS_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(USERS_URL, user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (user: User) => {
  try {
    const response = await axios.put(`${USERS_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${USERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProperties = async () => {
  try {
    const response = await axios.get(PROPERTY_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProperty = async (id: string) => {
  try {
    const response = await axios.get(`${PROPERTY_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProperty = async (property: Property) => {
  try {
    const response = await axios.post(PROPERTY_URL, property);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProperty = async (property: Property) => {
  try {
    const response = await axios.put(
      `${PROPERTY_URL}/${property.id}`,
      property
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const response = await axios.delete(`${PROPERTY_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (credentials: Auth) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (credentials: RegisterModel) => {
  try {
    const response = await axios.post(REGISTER_URL, credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

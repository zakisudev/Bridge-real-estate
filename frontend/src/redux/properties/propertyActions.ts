import {
  PropertyModel,
  PropertyResponse,
} from "../interfaces/propertyInterface";
import propertyTypes from "./propertyTypes";

export const fetchProperties = () => {
  return {
    type: propertyTypes.GET_PROPERTIES,
  };
};

export const fetchProperty = (id: string) => {
  return {
    type: propertyTypes.GET_PROPERTY,
    payload: id,
  };
};

export const setProperties = (properties: PropertyResponse[]) => {
  return {
    type: propertyTypes.SET_PROPERTIES,
    payload: properties,
  };
};

export const setProperty = (property: PropertyResponse) => {
  return {
    type: propertyTypes.SET_PROPERTY,
    payload: property,
  };
};

export const createProperty = (property: PropertyModel) => {
  return {
    type: propertyTypes.ADD_PROPERTY,
    payload: property,
  };
};

export const updateProperty = (property: PropertyModel) => {
  return {
    type: propertyTypes.UPDATE_PROPERTY,
    payload: property,
  };
};

export const deleteProperty = (id: string) => {
  return {
    type: propertyTypes.DELETE_PROPERTY,
    payload: id,
  };
};

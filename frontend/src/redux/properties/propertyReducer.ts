import { createSlice } from "@reduxjs/toolkit";
import { PropertyState } from "../interfaces/propertyInterface";

const initialState: PropertyState = {
  properties: [],
  property: null,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    getProperties(state) {
      state.error = null;
      state.loading = true;
    },

    getPropertiesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    setProperties(state, action) {
      state.loading = false;
      state.properties = action.payload;
    },

    getProperty(state) {
      state.loading = true;
    },

    getPropertyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    setProperty(state, action) {
      state.loading = false;
      state.property = action.payload;
    },

    addProperty(state) {
      state.loading = true;
    },
    addPropertySuccess(state, action) {
      state.loading = false;
      state.properties = [...(state.properties || []), action.payload];
    },
    addPropertyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateProperty(state) {
      state.loading = true;
    },
    updatePropertySuccess(state, action) {
      state.loading = false;
      state.properties = (state.properties || []).map((property) =>
        property.id === action.payload.id ? action.payload : property
      );
    },
    updatePropertyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProperty(state) {
      state.loading = true;
    },
    deletePropertySuccess(state, action) {
      state.loading = false;
      state.properties = (state.properties || []).filter(
        (property) => property.id !== action.payload
      );
    },
    deletePropertyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProperties,
  setProperties,
  getPropertiesFailed,

  getProperty,
  setProperty,
  getPropertyFailed,

  addProperty,
  addPropertySuccess,
  addPropertyFailed,

  updateProperty,
  updatePropertySuccess,
  updatePropertyFailed,

  deleteProperty,
  deletePropertySuccess,
  deletePropertyFailed,
} = propertySlice.actions;

export default propertySlice.reducer;

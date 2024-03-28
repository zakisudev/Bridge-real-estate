import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  properties: [
    {
      id: "",
      title: "",
      description: "",
      address: "",
      bathrooms: 0,
      bedrooms: 0,
      furnished: false,
      parking: false,
      size: 0,
      discountedPrice: 0,
      regularPrice: 0,
      type: "",
      offer: false,
      imageUrls: [""],
      user_id: 0,
    },
  ],
  property: null,
  pagination: {
    totalPages: 0,
    prevPage: null,
    nextPage: null,
    totalItems: 0,
    currentPage: 1,
    pageSize: 9,
  },
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
      state.properties = action.payload.properties;
      state.pagination = action.payload.pagination;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.properties = (state.properties || []).map((property: any) =>
        property.id === action.payload.id ? action.payload : property
      );
      state.property = action.payload;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (property: any) => property.id !== action.payload
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

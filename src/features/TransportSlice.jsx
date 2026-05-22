import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransport = createAsyncThunk("getTransport", async () => {
  const request = await axios.get(`http://localhost:3000/transports`);
  return request?.data;
});

export const deleteTransport = createAsyncThunk("deleteTransport", async (id) => {
  await axios.delete(`http://localhost:3000/transports/${id}`);
  return id; 
});

export const addTransport = createAsyncThunk("addTransport", async (newItem) => {
  const request = await axios.post(`http://localhost:3000/transports`, newItem);
  return request?.data;
});

export const editTransport = createAsyncThunk("editTransport", async ({ id, updatedItem }) => {
  const request = await axios.put(`http://localhost:3000/transports/${id}`, updatedItem);
  return request?.data;
});

const transportSlice = createSlice({
  name: "transportSlice",
  initialState: {
    transports: [],
    isLoading: false,
    isError: null,
    isEditModalOpen: false,
    isAddModalOpen: false,
    selectedTransport: null, 
  },

  reducers: {
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.selectedTransport = action.payload; 
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.selectedTransport = null;
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTransport.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTransport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transports = action.payload;
      })
      .addCase(getTransport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error";
      });

    builder
      .addCase(deleteTransport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transports = state.transports.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTransport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error";
      });

    builder.addCase(addTransport.fulfilled, (state, action) => {
      state.transports.push(action.payload);
      state.isAddModalOpen = false;
    });

    builder.addCase(editTransport.fulfilled, (state, action) => {
      const index = state.transports.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.transports[index] = action.payload;
      }
      state.isEditModalOpen = false;
      state.selectedTransport = null;
    });
  },
});

export const { openEditModal, closeEditModal, openAddModal, closeAddModal } = transportSlice.actions;
export default transportSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransport = createAsyncThunk('getTransport' , 
    async () => {
        const request = await axios.get(`http://localhost:3000/transports`);
        return request?.data;
    });

    const transportSlice = createSlice({
        name : "transportSlice",
        initialState : {
            transports : [],
            isLoading : null,
            isError : null
        },

        reducers : {},

        extraReducers : (builder) => {
            builder.addCase(getTransport.pending , (state) => {
                state.isLoading = true,
                state.isError = null
            }),
            builder.addCase(getTransport.fulfilled , (state , action) => {
                state.isLoading = false,
                state.transports = action?.payload,
                state.isError = null
            }),
            builder.addCase(getTransport.rejected , (state , action) => {
                state.isLoading = false,
                state.isError = action.error.message || "Error";
            });
        }
    });

    export default transportSlice.reducer
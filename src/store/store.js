import { configureStore } from "@reduxjs/toolkit";
import transports from "../features/TransportSlice";

export const store = configureStore({
    reducer : {
        transports : transports,
    }
});
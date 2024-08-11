import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/authSlice";
import { apiKKSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    [apiKKSlice.reducerPath]: apiKKSlice.reducer,
    auth: authReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiKKSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a typed version of useSelector if needed
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

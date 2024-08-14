import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { gitHubApi } from "../api";

const rootReducer = combineReducers({
  searchReducer,
  [gitHubApi.reducerPath]: gitHubApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitHubApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

export { setIsError, setIsFetching, setData } from "./searchSlice";

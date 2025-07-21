import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { gitHubApi } from "../api";

const rootReducer = combineReducers({
  searchReducer,
  [gitHubApi.reducerPath]: gitHubApi.reducer,
});

/**
 * Redux store, настроенный с корневым редьюсером и middleware RTK Query.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitHubApi.middleware),
});

/**
 * Тип Redux store.
 *
 * Используется для типизации параметров store в приложении.
 */
export type AppStore = typeof store;

/**
 * Тип состояния Redux, возвращаемый корневым редьюсером.
 *
 * Используется для типизации состояния в селекторах и хуках.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Тип dispatch, связанный с `AppStore`.
 *
 * Используется для типизации dispatch в хуках и компонентах.
 */
export type AppDispatch = AppStore["dispatch"];

export {
  setIsError,
  setIsFetching,
  setData,
  setQuery,
  setOrder,
  setPage,
  setPerPage,
  setSort,
} from "./searchSlice";

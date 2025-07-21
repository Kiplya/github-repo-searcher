import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRepositoriesRes } from "../api";

interface SearchState {
  query: string;
  page: number;
  perPage: number;
  sort: string;
  order: "asc" | "desc";

  data: SearchRepositoriesRes | null;
  isFetching: boolean;
  isError: boolean;
}

const initialState: SearchState = {
  query: "",
  page: 1,
  perPage: 10,
  sort: "stars",
  order: "desc",

  data: null,
  isFetching: false,
  isError: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },

    setOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.order = action.payload;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },

    setData(state, action: PayloadAction<SearchRepositoriesRes>) {
      state.data = action.payload;
    },

    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;

      if (action.payload) {
        state.isError = false;
      }
    },

    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

/**
 * Redux action для установки данных результата поиска репозиториев.
 *
 * @param payload данные, полученные от GitHub API типа `SearchRepositoriesRes`.
 */
export const setData = searchSlice.actions.setData;

/**
 * Redux action для установки флага загрузки данных.
 * При установке в `true` автоматически сбрасывает флаг ошибки в `false`.
 *
 * @param payload состояние загрузки (`true`/`false`).
 */
export const setIsFetching = searchSlice.actions.setIsFetching;

/**
 * Redux action для установки флага ошибки при запросе данных.
 *
 * @param payload состояние ошибки (`true`/`false`).
 */
export const setIsError = searchSlice.actions.setIsError;

/**
 * Redux action для установки поискового запроса.
 *
 * @param payload строка поискового запроса.
 */
export const setQuery = searchSlice.actions.setQuery;

/**
 * Redux action для установки поля сортировки.
 *
 * @param payload имя поля сортировки (`name`, `stars`, `forks`, `updated`).
 */
export const setSort = searchSlice.actions.setSort;

/**
 * Redux action для установки порядка сортировки.
 *
 * @param payload направление сортировки: `asc` или `desc`.
 */
export const setOrder = searchSlice.actions.setOrder;

/**
 * Redux action для установки текущей страницы пагинации.
 *
 * @param payload номер страницы **(начиная с 1)**.
 */
export const setPage = searchSlice.actions.setPage;

/**
 * Redux action для установки количества элементов на странице.
 *
 * @param payload количество элементов за 1 запрос **(не более 100)**.
 */
export const setPerPage = searchSlice.actions.setPerPage;

/**
 * Редьюсер для состояния поиска репозиториев.
 *
 * Содержит поля:
 * - `query: string` — поисковый запрос.
 * - `page: number` — текущая страница.
 * - `perPage: number` — количество элементов на страницу.
 * - `sort: string` — поле сортировки.
 * - `order: "asc" | "desc"` — порядок сортировки.
 * - `data: SearchRepositoriesRes | null` — данные результата поиска.
 * - `isFetching: boolean` — флаг загрузки.
 * - `isError: boolean` — флаг ошибки.
 */
export const searchReducer = searchSlice.reducer;

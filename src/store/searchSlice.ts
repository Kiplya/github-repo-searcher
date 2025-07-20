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
  sort: "name",
  order: "asc",

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

export const {
  setData,
  setIsFetching,
  setIsError,
  setQuery,
  setSort,
  setOrder,
  setPage,
  setPerPage,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

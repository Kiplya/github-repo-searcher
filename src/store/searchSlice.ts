import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRepositoriesRes } from "../api";

interface SearchState {
  data: SearchRepositoriesRes | null;
  isFetching: boolean;
  isError: boolean;
}

const initialState: SearchState = {
  data: null,
  isFetching: false,
  isError: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
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

export const { setData, setIsFetching, setIsError } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

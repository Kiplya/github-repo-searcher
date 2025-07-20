import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsError, setIsFetching, setData } from "../store";

export type SearchRepositoriesRes = {
  total_count: number;
};

type SearchRepositoriesReq = { q: string };

export const gitHubApi = createApi({
  reducerPath: "gitHubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
      );
      headers.set("Accept", "application/vnd.github+json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    searchRepositories: builder.query<
      SearchRepositoriesRes,
      SearchRepositoriesReq
    >({
      query: (params) => ({
        url: "search/repositories",
        method: "GET",
        params,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsFetching(true));

          const { data } = await queryFulfilled;
          dispatch(setData(data));
        } catch {
          dispatch(setIsError(true));
        } finally {
          dispatch(setIsFetching(false));
        }
      },
    }),
  }),
});

export const { useLazySearchRepositoriesQuery } = gitHubApi;

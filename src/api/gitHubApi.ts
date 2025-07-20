import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsError, setIsFetching, setData, setQuery } from "../store";

export type SearchRepositoriesRes = {
  total_count: number;
  items: {
    topics: string[];
    full_name: string;
    license?: { name: string };
    description?: string;
    name: string;
    language?: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  }[];
};

type SearchRepositoriesReq = {
  q: string;
  page?: number;
  per_page?: number;
  order?: string;
  sort?: string;
};

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

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          dispatch(setQuery(params.q));
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

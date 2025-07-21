import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsError, setIsFetching, setData, setQuery } from "../store";

/**
 * SearchRepositoriesRes — тип, описывающий структуру ответа от GitHub API
 * при выполнении запроса к `search/repositories`.
 *
 * @property `total_count: number` — общее количество найденных репозиториев.
 * @property `items[]` — массив репозиториев. Каждый элемент содержит:
 *   - `topics: string[]` — список тем репозитория.
 *   - `full_name: string` — полное имя репозитория в формате "owner/repo".
 *   - `license?: { name: string }` — объект лицензии, если указана.
 *   - `description?: string` — описание репозитория, если указано.
 *   - `name: string` — название репозитория.
 *   - `language?: string` — основной язык проекта, если определен.
 *   - `stargazers_count: number` — количество звёзд.
 *   - `forks_count: number` — количество форков.
 *   - `updated_at: string` — дата последнего обновления в формате ISO.
 */
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

/**
 * gitHubApi — API-слайс, созданный с помощью RTK Query для взаимодействия с GitHub REST API.
 *
 * Эндпоинт:
 * - `searchRepositories` — поиск репозиториев по ключевому слову с возможностью сортировки, пагинации и указания порядка.
 *
 * Особенности:
 * - Добавляет заголовок авторизации с токеном GitHub (`REACT_APP_GITHUB_TOKEN`) из переменных окружения.
 * - Автоматически обрабатывает состояния загрузки, ошибки и сохраняет полученные данные в Redux.
 * - Диспетчит Redux-экшены:
 *   - `setQuery` — сохраняет поисковый запрос.
 *   - `setIsFetching` — флаг загрузки.
 *   - `setData` — сохраняет результат поиска.
 *   - `setIsError` — устанавливает флаг ошибки при сбое.
 *
 * Типы:
 * - `SearchRepositoriesReq` — параметры запроса (`q`, `page`, `per_page`, `order`, `sort`)
 * - `SearchRepositoriesRes` — ответ GitHub API
 *
 * Экспортируемые хуки:
 * @function useLazySearchRepositoriesQuery — RTK Query хук для ленивого вызова поиска.
 */
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

/**
 * Хук RTK Query для ленивого запроса репозиториев по заданным условиям.
 *
 * Вызывает GET-запрос к endpoint `search/repositories` на GitHub.
 *
 * @params `SearchRepositoriesReq` — параметры запроса (`q`, `page`, `per_page`, `order`, `sort`)
 * @returns `SearchRepositoriesRes` — ответ GitHub API
 */
export const useLazySearchRepositoriesQuery =
  gitHubApi.useLazySearchRepositoriesQuery;

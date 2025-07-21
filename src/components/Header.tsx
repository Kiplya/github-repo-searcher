import { FC, useState } from "react";
import { useLazySearchRepositoriesQuery } from "../api";
import { useAppSelector, useAppDispatch } from "../hooks";
import { SearchBar } from "./ui";

import styles from "../styles/Header/header.module.css";
import { setPage } from "../store";

/**
 * Header — функциональный компонент, отвечающий за отображение поисковой строки
 * и запуск поиска репозиториев через API.
 *
 * Использует локальное состояние для хранения текста запроса,
 * а также данные из Redux (параметры поиска и управление страницей).
 *
 * При клике на кнопку поиска вызывает запрос к API с текущими параметрами.
 */
export const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, { isFetching }] = useLazySearchRepositoriesQuery();
  const perPage = useAppSelector((state) => state.searchReducer.perPage);
  const sort = useAppSelector((state) => state.searchReducer.sort);
  const order = useAppSelector((state) => state.searchReducer.order);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <SearchBar
        containerStyle={styles.searchBar_container}
        inputFieldStyle={styles.searchBar_inputField}
        onClick={() => {
          dispatch(setPage(1));
          trigger({
            q: searchQuery,
            per_page: perPage,
            order,
            sort,
          });
        }}
        disabled={isFetching}
        placeholder="Введите поисковый запрос"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
    </div>
  );
};

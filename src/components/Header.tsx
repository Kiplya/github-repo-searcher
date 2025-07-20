import { FC, useState } from "react";
import { useLazySearchRepositoriesQuery } from "../api";
import { SearchBar } from "./ui";

import styles from "../styles/Header/header.module.css";

export const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, { isFetching }] = useLazySearchRepositoriesQuery();

  return (
    <div className={styles.container}>
      <SearchBar
        onClick={() => trigger({ q: searchQuery })}
        disabled={isFetching}
        placeholder="Введите поисковый запрос"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
    </div>
  );
};

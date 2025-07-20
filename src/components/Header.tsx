import { FC, useState } from "react";
import { SearchBar } from "./ui";

import styles from "../styles/Header/header.module.css";

export const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.container}>
      <SearchBar
        onClick={() => {}}
        placeholder="Введите поисковый запрос"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
    </div>
  );
};

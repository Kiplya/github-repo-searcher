import { FC } from "react";
import { Loader, RepoTable } from "./ui";
import { useAppSelector } from "../hooks";
import { Typography } from "@mui/material";

import styles from "../styles/Main/main.module.css";

export const Main: FC = () => {
  const data = useAppSelector((state) => state.searchReducer.data);
  const isError = useAppSelector((state) => state.searchReducer.isError);
  const isFetching = useAppSelector((state) => state.searchReducer.isFetching);

  if (isFetching) {
    return <Loader styles={styles} />;
  }

  if (isError) {
    return (
      <Typography className={styles.centredMessage} variant="h2">
        Произошла ошибка. Введите другой запрос или повторите этот чуть позже
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography className={styles.centredMessage} variant="h2">
        Добро пожаловать
      </Typography>
    );
  }

  if (data.total_count === 0) {
    return (
      <Typography className={styles.centredMessage} variant="h2">
        Ничего не найдено
      </Typography>
    );
  }

  return <RepoTable styles={styles}/>;
};

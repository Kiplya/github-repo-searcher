import { FC } from "react";
import { Loader } from "./ui";
import { useAppSelector } from "../hooks";

import styles from "../styles/Main/main.module.css";

export const Main: FC = () => {
  const data = useAppSelector((state) => state.searchReducer.data);
  const isError = useAppSelector((state) => state.searchReducer.isError);
  const isFetching = useAppSelector((state) => state.searchReducer.isFetching);

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className={styles.centredMessage}>
        Произошла ошибка. Введите другой запрос или повторите этот чуть позже
      </p>
    );
  }

  if (!data) {
    return <p className={styles.centredMessage}>Добро пожаловать</p>;
  }

  if (data.total_count === 0) {
    return <p className={styles.centredMessage}>Ничего не найдено</p>;
  }

  return <div className={styles.container}></div>;
};

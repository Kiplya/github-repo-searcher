import { FC } from "react";
import { Loader, RepsTable } from "./ui";
import { useAppSelector } from "../hooks";
import { Typography } from "@mui/material";

import styles from "../styles/Main/main.module.css";

/**
 * Главный компонент страницы.
 * Отображает загрузку, ошибки, приветствие или таблицу репозиториев в зависимости от состояния поиска.
 *
 * - Если идёт загрузка: показывает <Loader />
 * - Если произошла ошибка: выводит сообщение об ошибке
 * - Если нет данных: приветственное сообщение
 * - Если ничего не найдено: сообщение о пустом результате
 * - Иначе: отображает таблицу репозиториев
 */
export const Main: FC = () => {
  const data = useAppSelector((state) => state.searchReducer.data);
  const isError = useAppSelector((state) => state.searchReducer.isError);
  const isFetching = useAppSelector((state) => state.searchReducer.isFetching);

  if (isFetching) {
    return <Loader styles={styles.loader_container} />;
  }

  if (isError) {
    return (
      <Typography className={styles.centredText} variant="h2">
        Произошла ошибка. Введите другой запрос или повторите этот чуть позже
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography className={styles.centredText} variant="h2">
        Добро пожаловать
      </Typography>
    );
  }

  if (data.total_count === 0) {
    return (
      <Typography className={styles.centredText} variant="h2">
        Ничего не найдено
      </Typography>
    );
  }

  return (
    <RepsTable
      centredTextStyle={styles.centredText}
      backButtonStyle={styles.backButton}
      infoVisibleStyle={styles.visible}
      tableHiddenStyle={styles.hidden}
      containerStyle={styles.container}
      tableContainerStyle={styles.table_container}
      infoContainerStyle={styles.info_container}
      languageContainerStyle={styles.language_container}
    />
  );
};

import { FC } from "react";
import { Header, Main } from "./components";

import styles from "./styles/App/app.module.css";

/**
 * App — корневой компонент приложения.
 *
 * Отвечает за базовую структуру страницы:
 * содержит шапку <Header /> и основное содержимое <Main />.
 */
export const App: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  );
};

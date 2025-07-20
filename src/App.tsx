import { FC } from "react";
import { Header, Main } from "./components";

import styles from "./styles/App/app.module.css";

export const App: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  );
};

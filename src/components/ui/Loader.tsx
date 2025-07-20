import { FC } from "react";
import { CircularProgress } from "@mui/material";

import styles from "../../styles/Loader/loader.module.css";

export const Loader: FC = () => (
  <div className={styles.container}>
    <CircularProgress />
  </div>
);

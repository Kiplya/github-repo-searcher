import { FC } from "react";
import { CircularProgress } from "@mui/material";

interface Props {
  styles: { [key: string]: string };
}

export const Loader: FC<Props> = ({ styles }) => (
  <div className={styles.loader_container}>
    <CircularProgress />
  </div>
);

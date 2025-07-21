import { FC } from "react";
import { CircularProgress } from "@mui/material";

interface Props {
  styles?: string;
}

/**
 * Компонент отображения индикатора загрузки.
 *
 * @param styles - необязательное имя CSS-класса для контейнера.
 */
export const Loader: FC<Props> = ({ styles }) => (
  <div className={styles}>
    <CircularProgress />
  </div>
);

import { FC, ChangeEvent, MouseEvent } from "react";
import { InputBase, Button } from "@mui/material";

import styles from "../../styles/Header/header.module.css";

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SearchBar: FC<Props> = ({
  placeholder,
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className={styles.searchBar_container}>
      <InputBase
        className={styles.searchBar_inputField}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <Button variant="contained" onClick={onClick}>
        искать
      </Button>
    </div>
  );
};

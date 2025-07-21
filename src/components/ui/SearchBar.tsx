import { FC, ChangeEvent, MouseEvent } from "react";
import { InputBase, Button } from "@mui/material";
interface Props {
  styles: { [key: string]: string };
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SearchBar: FC<Props> = ({
  styles,
  placeholder,
  value,
  disabled = false,
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

      <Button
        disabled={disabled || !value}
        variant="contained"
        onClick={onClick}
      >
        искать
      </Button>
    </div>
  );
};

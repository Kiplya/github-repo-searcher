import { FC, ChangeEvent, MouseEvent } from "react";
import { InputBase, Button } from "@mui/material";
interface Props {
  containerStyle?: string;
  inputFieldStyle?: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * `SearchBar` — универсальный компонент поисковой строки с кнопкой.
 *
 * Принимает стили контейнера и поля ввода через пропсы для гибкой кастомизации.
 *
 * Пропсы:
 * @param containerStyle - необязательное имя CSS класса для обёртки компонента
 * @param inputFieldStyle - необязательное имя CSS класса для поля ввода
 * @param placeholder - плейсхолдер для поля ввода
 * @param value - текущее значение поля ввода
 * @param disabled - флаг, отключающий кнопку поиска (по умолчанию false)
 * @param onChange - обработчик изменения текста в поле ввода
 * @param onClick - обработчик нажатия на кнопку поиска
 */
export const SearchBar: FC<Props> = ({
  containerStyle,
  inputFieldStyle,
  placeholder,
  value,
  disabled = false,
  onChange,
  onClick,
}) => {
  return (
    <div className={containerStyle}>
      <InputBase
        className={inputFieldStyle}
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

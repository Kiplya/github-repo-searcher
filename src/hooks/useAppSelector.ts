import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";

/**
 * Хук `useAppSelector` — типизированная версия `useSelector` из react-redux,
 * автоматически привязанная к типу `RootState` из Redux store.
 *
 * Используется для получения данных из Redux-состояния с полной поддержкой TypeScript.
 *
 * @returns значение, выбранное из состояния Redux, с типом, соответствующим возвращаемому значению селектора.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

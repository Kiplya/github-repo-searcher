import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";

/**
 * Хук `useAppDispatch` — обёртка над стандартным `useDispatch` из react-redux
 * с указанием типа `AppDispatch`.
 *
 * Используется для получения типизированного диспатча в приложении.
 *
 * @returns {AppDispatch} типизированный dispatch, соответствующий Redux store.
 *
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

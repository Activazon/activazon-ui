import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useActivazonDispatch = () => useDispatch<AppDispatch>();

export const useActivazonSelector: TypedUseSelectorHook<RootState> =
  useSelector;

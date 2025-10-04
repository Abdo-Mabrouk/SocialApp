import { AppDispatch, AppGetState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const AppUseSelector =useSelector.withTypes<AppGetState>();
export const AppUseDispatch =useDispatch.withTypes<AppDispatch>();
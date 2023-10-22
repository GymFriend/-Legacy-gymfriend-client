import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistConfig from "./PersistConfig";
import accountReducer from "./slices/AccountSlice";

const rootReducer = combineReducers({
  account: accountReducer,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

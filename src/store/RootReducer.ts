import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistConfig from "./PersistConfig";

const rootReducer = combineReducers({
  // TODO: reducers 추가
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

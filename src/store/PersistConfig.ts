import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 브라우저 storage에 저장될 반영구적 데이터 설정입니다.
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: [],
};

export default persistConfig;

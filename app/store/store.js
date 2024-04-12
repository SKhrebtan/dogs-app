import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { dogsApi } from "./dogs/dogsSlice";
import { userApi } from "./user/userSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "avatar"],
};

export const store = configureStore(
  {
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      [dogsApi.reducerPath]: dogsApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      dogsApi.middleware,
      userApi.middleware,
    ],
  },
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;

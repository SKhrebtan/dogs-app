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

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
export const store = configureStore(
  {
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      [dogsApi.reducerPath]: dogsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      dogsApi.middleware,
    ],
  },
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./userSlice";
import shipmentReducer from "./ShipmentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "shipment"],
};

const rootReducer = combineReducers({
  user: userReducer,
  shipment: shipmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

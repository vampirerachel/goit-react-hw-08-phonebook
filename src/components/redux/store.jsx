import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contactsReducer, { fetchContacts } from "./contactReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});

store.dispatch(fetchContacts());

export default store;

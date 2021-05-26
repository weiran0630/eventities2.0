import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./slice/eventSlice";

const store = configureStore({
	reducer: { event: eventReducer },
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

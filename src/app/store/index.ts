import { asyncReducer } from "./slice/asyncSlice";
import { sandboxReducer } from "./slice/sandboxSlice";
import { modalReducer } from "./slice/modalSlice";
import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./slice/eventSlice";
import { authReducer } from "./slice/authSlice";

const store = configureStore({
	reducer: {
		event: eventReducer,
		modals: modalReducer,
		sandbox: sandboxReducer,
		auth: authReducer,
		async: asyncReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

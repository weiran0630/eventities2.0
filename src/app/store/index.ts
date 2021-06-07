import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import { asyncReducer } from "./slice/asyncSlice";
import { sandboxReducer } from "./slice/sandboxSlice";
import { modalReducer } from "./slice/modalSlice";
import { eventReducer } from "./slice/eventSlice";
import { authReducer, verifyAuth } from "./slice/authSlice";
import { profileReducer } from "./slice/profileSlice";

const store = configureStore({
	reducer: {
		event: eventReducer,
		modals: modalReducer,
		sandbox: sandboxReducer,
		auth: authReducer,
		async: asyncReducer,
		profile: profileReducer,
	},
	middleware: getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/** call with every app initialize */
store.dispatch(verifyAuth());

export default store;

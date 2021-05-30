import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = null | { email: string; photoURL: string };

const initialState = {
	authenticated: true,
	currentUser: { email: "bob@test.com", photoURL: "/assets/user.png" } as User,
};

const authSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<string>) => {
			state.authenticated = true;
			state.currentUser = {
				email: action.payload,
				photoURL: "/assets/user.png",
			};
		},
		singOut: (state) => {
			state.authenticated = false;
			state.currentUser = null;
		},
	},
});

export const { signIn, singOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

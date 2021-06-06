import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUserProfile: null as any,
	selectedUserProfile: null as any,
};

const profileSlice = createSlice({
	name: "profile",
	initialState: initialState,
	reducers: {
		listenToCurrentUserProfile: (state, action) => {
			state.currentUserProfile = action.payload;
		},
		listenToSelectedUserProfile: (state, action) => {
			state.selectedUserProfile = action.payload;
		},
	},
});

export const { listenToCurrentUserProfile, listenToSelectedUserProfile } =
	profileSlice.actions;

export const profileReducer = profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { CollectionRef, User } from "../../../app/common/model/interfaces";

const initialState = {
	currentUserProfile: null as unknown as User,
	selectedUserProfile: null as unknown as User,
	photos: [] as CollectionRef[],
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
		listenToUserPhotos: (state, action) => {
			state.photos = action.payload;
		},
	},
});

export const {
	listenToCurrentUserProfile,
	listenToSelectedUserProfile,
	listenToUserPhotos,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

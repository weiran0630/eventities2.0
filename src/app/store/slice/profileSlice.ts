import { createSlice } from "@reduxjs/toolkit";
import {
	CollectionRef,
	User,
	Event,
} from "../../../app/common/model/interfaces";

const initialState = {
	currentUserProfile: null as User | null,
	selectedUserProfile: null as User | null,
	photos: [] as CollectionRef[],
	profileEvents: [] as Event[],
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
		listenToUserEvents: (state, action) => {
			state.profileEvents = action.payload;
		},
	},
});

export const {
	listenToCurrentUserProfile,
	listenToSelectedUserProfile,
	listenToUserPhotos,
	listenToUserEvents,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

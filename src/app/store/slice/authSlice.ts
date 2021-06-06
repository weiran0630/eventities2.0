import {
	getUserProfile,
	dataFromSnapshot,
} from "./../../firestore/firestoreService";
import firebase from "../../config/firebase";
import { AppDispatch } from "./../index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appLoaded } from "./asyncSlice";
import { listenToCurrentUserProfile } from "./profileSlice";

const initialState = {
	authenticated: false,
	currentUser: null as any,
};

/** this function would be called every time store initialize */
export const verifyAuth = () => {
	return (dispatch: AppDispatch) =>
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dispatch(signIn(user));

				const profileRef = getUserProfile(user.uid);
				profileRef.onSnapshot((snapshot) => {
					dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot))); // get the use profile before tell app has been loaded
					dispatch(appLoaded()); // stops loading component after singIn or signOut complete
				});
			} else {
				dispatch(singOut());
				dispatch(appLoaded());
			}
		});
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signIn: (state, { payload }: PayloadAction<firebase.User>) => {
			state.authenticated = true;
			state.currentUser = {
				email: payload.email,
				photoURL: payload.photoURL,
				uid: payload.uid,
				displayName: payload.displayName,
				providerId: payload.providerData[0]?.providerId,
			};
		},
		singOut: (state) => {
			state.authenticated = false;
			state.currentUser = null;
		},
	},
});

export const { singOut, signIn } = authSlice.actions;

export const authReducer = authSlice.reducer;

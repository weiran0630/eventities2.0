import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	initialized: false,
	error: null as any,
};

const asyncSlice = createSlice({
	name: "async",
	initialState: initialState,
	reducers: {
		asyncActionStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		asyncActionFinish: (state) => {
			state.loading = false;
		},
		asyncActionError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		appLoaded: (state) => {
			state.initialized = true;
		},
	},
});

export const {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
	appLoaded,
} = asyncSlice.actions;

export const asyncReducer = asyncSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
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
	},
});

export const { asyncActionStart, asyncActionFinish, asyncActionError } =
	asyncSlice.actions;
export const asyncReducer = asyncSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	count: 0,
};

const sandboxSlice = createSlice({
	name: "sandbox",
	initialState,
	reducers: {
		increment(state) {
			state.count += 1;
		},
		decrement(state) {
			state.count -= 1;
		},
		incrementWithValue(state, action: PayloadAction<number>) {
			state.count += action.payload;
		},
	},
});

export const { increment, decrement, incrementWithValue } =
	sandboxSlice.actions;

export const sandboxReducer = sandboxSlice.reducer;

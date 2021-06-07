import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { delay } from "../../common/util";
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from "./asyncSlice";
import { toast } from "react-toastify";

const initialState = {
	count: 0,
};

/** async reducer can be created with createAsyncThunk,
 *  then add to extraReducers inside createSlide */
export const delayedIncrementWithValue = createAsyncThunk(
	"sandbox/delayedIncrement",
	async (value: number, { dispatch }) => {
		dispatch(asyncActionStart());
		try {
			await delay(1000);
			// eslint-disable-next-line
			throw "Oops, I'm experimenting with toastify";
			// eslint-disable-next-line
			dispatch(asyncActionFinish());
			return value;
		} catch (error) {
			dispatch(asyncActionError(error));
			toast.error(error);
		}
	}
);

export const delayedDecrementWithValue = createAsyncThunk(
	"sandbox/delayedDecrement",
	async (value: number, { dispatch }) => {
		dispatch(asyncActionStart());
		try {
			await delay(1000);
			dispatch(asyncActionFinish());
			return value;
		} catch (error) {
			dispatch(asyncActionError(error));
		}
	}
);

/** reducers can mutate state directly within rtk */
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
	extraReducers: {
		/** for TypeScript, add .type after .fulfilled */
		[delayedIncrementWithValue.fulfilled.type]: (
			state,
			action: PayloadAction<number>
		) => {
			if (isNaN(action.payload)) return;
			state.count += action.payload;
		},
		[delayedDecrementWithValue.fulfilled.type]: (
			state,
			action: PayloadAction<number>
		) => {
			state.count -= action.payload;
		},
	},
});

export const { increment, decrement, incrementWithValue } =
	sandboxSlice.actions;

export const sandboxReducer = sandboxSlice.reducer;

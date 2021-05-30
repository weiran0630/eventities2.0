import { toast } from "react-toastify";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../common/model/interfaces";
import { fetchSampleData } from "../../API/MockApi";
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart,
} from "./asyncSlice";

const initialState = {
	events: [] as Event[],
};

export const fetchEvent = createAsyncThunk(
	"event/fetchEvent",
	async (placeholder: void, { dispatch }) => {
		dispatch(asyncActionStart());
		try {
			const response = await fetchSampleData();
			dispatch(asyncActionFinish());
			return response;
		} catch (error) {
			dispatch(asyncActionError(error));
			toast.error(error);
		}
	}
);

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		createEvent: (state, action: PayloadAction<Event>) => {
			state.events.push(action.payload);
		},
		updateEvent: (state, action: PayloadAction<Event>) => {
			const updatedEvents = [
				...state.events.filter((event) => event.id !== action.payload.id),
				action.payload,
			];
			state.events = updatedEvents;
		},
		deleteEvent: (state, action: PayloadAction<string>) => {
			const filteredEvent = state.events.filter(
				(event) => event.id !== action.payload
			);
			state.events = filteredEvent;
		},
	},
	extraReducers: {
		[fetchEvent.fulfilled.type]: (state, action: PayloadAction<Event[]>) => {
			state.events = action.payload;
		},
	},
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;

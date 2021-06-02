import { Event } from "./../../common/model/interfaces";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchSampleData } from "../../API/MockApi";

const initialState = {
	events: [] as Event[],
};

export const listenToEvent = createAsyncThunk(
	"event/fetchEvent",
	async (events: any) => {
		try {
			return events;
		} catch (error) {
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
	extraReducers: (builder) => {
		builder.addCase(listenToEvent.fulfilled, (state, action) => {
			state.events = action.payload;
		});
	},
	// extraReducers: {
	// 	[listenToEvent.fulfilled.type]: (state, action: PayloadAction<Event[]>) => {
	// 		state.events = action.payload;
	// 	},
	// },
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;

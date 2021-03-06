import { Event, Comment } from "./../../common/model/interfaces";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchSampleData } from "../../API/MockApi";

const initialState = {
	events: [] as Event[],
	comments: [] as Comment[],
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
		listenToEventChat: (state, action: any) => {
			state.comments = action.payload;
		},
		clearEventChat: (state) => {
			state.comments = [];
		},
	},

	extraReducers: {
		[listenToEvent.fulfilled.type]: (state, action: any) => {
			state.events = action.payload;
		},
	},
});

export const {
	createEvent,
	updateEvent,
	deleteEvent,
	listenToEventChat,
	clearEventChat,
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;

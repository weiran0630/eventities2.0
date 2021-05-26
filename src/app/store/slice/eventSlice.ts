import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sampleData } from "../../API/sampleData";
import { Event } from "../../model/interfaces";

const initialState = {
	events: sampleData,
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		createEvent(state, action: PayloadAction<Event>) {
			state.events.push(action.payload);
		},
		updateEvent(state, action: PayloadAction<Event>) {
			const filtered = state.events.filter(
				(event) => event.id !== action.payload.id
			);
			filtered.push(action.payload);
			state.events = filtered;
		},
		deleteEvent(state, action: PayloadAction<string>) {
			const filtered = state.events.filter(
				(event) => event.id !== action.payload
			);
			state.events = filtered;
		},
	},
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sampleData } from "../../API/sampleData";
import { Event } from "../../common/model/interfaces";

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
			const updatedEvents = [
				...state.events.filter((event) => event.id !== action.payload.id),
				action.payload,
			];
			state.events = updatedEvents;
		},
		deleteEvent(state, action: PayloadAction<string>) {
			const filteredEvent = state.events.filter(
				(event) => event.id !== action.payload
			);
			state.events = filteredEvent;
		},
	},
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;

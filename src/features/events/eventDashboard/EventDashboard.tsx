import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { Event } from "../../../app/model/interfaces";
/** seeded data */
import { sampleData } from "../../../app/API/sampleData";

interface EventDashboardProps {
	formVisible: boolean;
	selectedEvent: Event | undefined;
	setFormVisible: (value: boolean) => void;
	setSelectedEvent: (event: Event | undefined) => void;
}

const EventDashboard: React.FC<EventDashboardProps> = () => {
	const [events, setEvents] = useState<Event[]>(sampleData);

	// const handleCreateEvent = (event: Event) => {
	// 	setEvents([...events, event]);
	// };
	// const handleUpdateEvent = (updatedEvent: Event) => {
	// 	setEvents(
	// 		events.map((event) =>
	// 			event.id === updatedEvent.id ? updatedEvent : event
	// 		)
	// 	);
	// 	setSelectedEvent(undefined);
	// };

	const handleDeleteEvent = (id: string) => {
		setEvents(events.filter((event) => event.id !== id));
	};

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList events={events} deleteEvent={handleDeleteEvent} />
			</Grid.Column>

			<Grid.Column width={6}>
				<h2>Filters</h2>
			</Grid.Column>
		</Grid>
	);
};

export default EventDashboard;

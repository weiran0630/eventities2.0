import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
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

const EventDashboard: React.FC<EventDashboardProps> = ({
	formVisible,
	selectedEvent,
	setFormVisible,
	setSelectedEvent,
}) => {
	const [events, setEvents] = useState<Event[]>(sampleData);

	const handleCreateEvent = (event: Event) => {
		setEvents([...events, event]);
	};
	const handleUpdateEvent = (updatedEvent: Event) => {
		setEvents(
			events.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			)
		);
		setSelectedEvent(undefined);
	};

	const handleDeleteEvent = (id: string) => {
		setEvents(events.filter((event) => event.id !== id));
	};

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList
					events={events}
					setFormVisible={setFormVisible}
					setSelectedEvent={setSelectedEvent}
					deleteEvent={handleDeleteEvent}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{formVisible && (
					<EventForm
						key={selectedEvent ? selectedEvent.id : null}
						setFormVisible={setFormVisible}
						createEvent={handleCreateEvent}
						selectedEvent={selectedEvent}
						updateEvent={handleUpdateEvent}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default EventDashboard;

import React from "react";
import EventListItem from "./EventListItem";
import { Event } from "../../../app/model/interfaces";

interface EventListProps {
	events: Event[];
	setFormVisible: (value: boolean) => void;
	setSelectedEvent: (event: Event) => void;
	deleteEvent: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({
	events,
	setFormVisible,
	setSelectedEvent,
	deleteEvent,
}) => {
	return (
		<>
			{events.map((event) => (
				<EventListItem
					key={event.id}
					event={event}
					setSelectedEvent={setSelectedEvent}
					deleteEvent={deleteEvent}
				/>
			))}
		</>
	);
};

export default EventList;

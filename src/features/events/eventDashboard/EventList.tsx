import React from "react";
import EventListItem from "./EventListItem";
import { Event } from "../../../app/model/interfaces";

interface EventListProps {
	events: Event[];
	deleteEvent: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({
	events,

	deleteEvent,
}) => {
	return (
		<>
			{events.map((event) => (
				<EventListItem key={event.id} event={event} deleteEvent={deleteEvent} />
			))}
		</>
	);
};

export default EventList;

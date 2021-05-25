import React from "react";
import EventListItem from "./EventListItem";
import { Event } from "../../../app/model/interfaces";

interface EventListProps {
	events: Event[];
	setFormVisible: (value: boolean) => void;
	setSelectedEvent: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({
	events,
	setFormVisible,
	setSelectedEvent,
}) => {
	return (
		<>
			{events.map((event) => (
				<EventListItem
					key={event.id}
					event={event}
					setFormVisible={setFormVisible}
					setSelectedEvent={setSelectedEvent}
				/>
			))}
		</>
	);
};

export default EventList;

import React from "react";

import EventListItem from "./EventListItem";
import { Event } from "../../../app/common/model/interfaces";

interface EventListProps {
	events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
	return (
		<>
			{events.map((event) => (
				<EventListItem key={event.id} event={event} />
			))}
		</>
	);
};

export default EventList;

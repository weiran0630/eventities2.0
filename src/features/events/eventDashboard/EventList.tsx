import React from "react";
import EventListItem from "./EventListItem";
import { Event } from "../../../app/model/interfaces";

interface EventListProps {
	events: Event[];
	handleFormVisible: () => void;
}

const EventList: React.FC<EventListProps> = ({ events, handleFormVisible }) => {
	return (
		<>
			{events.map((event) => (
				<EventListItem
					key={event.id}
					event={event}
					handleFormVisible={handleFormVisible}
				/>
			))}
		</>
	);
};

export default EventList;

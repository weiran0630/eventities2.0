import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";
import { Event } from "../../../app/model/interfaces";
/** seeded data */
import { sampleData } from "../../../app/API/sampleData";

interface EventDashboardProps {
	formVisible: boolean;
	handleFormVisible: () => void;
}

const EventDashboard: React.FC<EventDashboardProps> = ({
	formVisible,
	handleFormVisible,
}) => {
	const [events, setEvents] = useState<Event[]>(sampleData);

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList events={events} handleFormVisible={handleFormVisible} />
			</Grid.Column>
			<Grid.Column width={6}>
				{formVisible && <EventForm handleFormVisible={handleFormVisible} />}
			</Grid.Column>
		</Grid>
	);
};

export default EventDashboard;

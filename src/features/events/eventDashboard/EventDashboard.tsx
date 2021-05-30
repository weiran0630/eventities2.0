import React from "react";
import { Grid } from "semantic-ui-react";

import EventList from "./EventList";
import { useTypedSelector } from "../../../app/store/hooks";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

const EventDashboard: React.FC = () => {
	const events = useTypedSelector((state) => state.event.events);
	const { loading } = useTypedSelector((state) => state.async);

	return (
		<Grid>
			<Grid.Column width={10}>
				{loading && (
					<>
						<EventListItemPlaceholder />
						<EventListItemPlaceholder />
					</>
				)}
				<EventList events={events} />
			</Grid.Column>

			<Grid.Column width={6}>
				<EventFilters />
			</Grid.Column>
		</Grid>
	);
};

export default EventDashboard;

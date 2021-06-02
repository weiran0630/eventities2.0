import React from "react";
import { Grid } from "semantic-ui-react";

import EventList from "./EventList";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvent } from "../../../app/store/slice/eventSlice";

const EventDashboard: React.FC = () => {
	const events = useTypedSelector((state) => state.event.events);
	const { loading } = useTypedSelector((state) => state.async);
	const dispatch = useTypedDispatch();

	useFirestoreCollection({
		query: () => listenToEventsFromFirestore(),
		data: (events: Event[]) => dispatch(listenToEvent(events)),
		dependencies: [dispatch],
	});

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

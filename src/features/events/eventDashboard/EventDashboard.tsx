import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import EventList from "./EventList";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvent } from "../../../app/store/slice/eventSlice";

export type predicateType = string | Date;

const EventDashboard: React.FC = () => {
	const events = useTypedSelector((state) => state.event.events);
	const { loading } = useTypedSelector((state) => state.async);
	const dispatch = useTypedDispatch();
	const [predicate, setPredicate] = useState<Map<string, predicateType>>(
		new Map().set("startDate", new Date()).set("filter", "all")
	);

	/** helper function to set predicate map */
	const handleSetPredicate = (key: string, value: predicateType) => {
		setPredicate(new Map(predicate.set(key, value)));
	};

	useFirestoreCollection({
		query: () => listenToEventsFromFirestore(predicate),
		data: (events: Event[]) => dispatch(listenToEvent(events)),
		dependencies: [dispatch, predicate],
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
				<EventFilters
					loading={loading}
					predicate={predicate}
					handleSetPredicate={handleSetPredicate}
				/>
			</Grid.Column>
		</Grid>
	);
};

export default EventDashboard;

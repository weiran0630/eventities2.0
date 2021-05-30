import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";

import EventList from "./EventList";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import {
	dataFromSnapshot,
	getEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import { fetchEvent } from "../../../app/store/slice/eventSlice";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart,
} from "../../../app/store/slice/asyncSlice";

const EventDashboard: React.FC = () => {
	const events = useTypedSelector((state) => state.event.events);
	const { loading } = useTypedSelector((state) => state.async);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(asyncActionStart());
		const unsubscribe = getEventsFromFirestore({
			next: (snapshot) => {
				dispatch(
					fetchEvent(
						snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
					)
				);
				dispatch(asyncActionFinish());
			},
			error: (error) => dispatch(asyncActionError(error)),
		});
		return unsubscribe;
	}, [dispatch]);

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

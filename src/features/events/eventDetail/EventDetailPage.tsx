import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import LoadingComponent from "../../../app/common/loadingComponent";
import { Event } from "../../../app/common/model/interfaces";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { listenToEvent } from "../../../app/store/slice/eventSlice";
import EventChatRoom from "./EventChatRoom";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";

interface ParamTypes {
	id: string;
}

const EventDetailPage: React.FC = () => {
	const { id } = useParams<ParamTypes>();

	const selectedEvent = useTypedSelector(({ event }) =>
		event.events.find((e) => e.id === id)
	);

	const { loading, error } = useTypedSelector((state) => state.async);

	const dispatch = useTypedDispatch();

	useFirestoreDoc({
		query: () => listenToEventFromFirestore(id),
		data: (event: Event) => dispatch(listenToEvent([event])),
		dependencies: [id, dispatch],
	});

	if (loading || (!selectedEvent && !error))
		return <LoadingComponent content="載入中" />;

	if (error) return <Redirect to="/error" />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailHeader event={selectedEvent!} />
				<EventDetailInfo event={selectedEvent!} />
				<EventChatRoom />
			</Grid.Column>

			<Grid.Column width={6}>
				<EventDetailSidebar attendees={selectedEvent!.attendees} />
			</Grid.Column>
		</Grid>
	);
};

export default EventDetailPage;

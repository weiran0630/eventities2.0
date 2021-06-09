import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import LoadingComponent from "../../../app/common/loadingComponent";
import { Event } from "../../../app/common/model/interfaces";
import { listenToIndividualEventFromFirestore } from "../../../app/firestore/firestoreService";
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
	const { currentUser } = useTypedSelector((state) => state.auth);
	const selectedEvent = useTypedSelector(({ event }) =>
		event.events.find((e) => e.id === id)
	);
	const { loading, error } = useTypedSelector((state) => state.async);
	const dispatch = useTypedDispatch();
	const isHost = selectedEvent?.hostUid === currentUser.uid; // is the current user the host of the event?
	const isAttending = selectedEvent?.attendees.some(
		(attendee) => attendee.id === currentUser.uid // is the current user an attender of the event?
	);

	useFirestoreDoc({
		query: () => listenToIndividualEventFromFirestore(id),
		data: (event: Event) => dispatch(listenToEvent([event])),
		dependencies: [id, dispatch],
	});

	if (loading || (!selectedEvent && !error))
		return <LoadingComponent content="載入中" />;

	if (error) return <Redirect to="/error" />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailHeader
					event={selectedEvent!}
					isHost={isHost!}
					isAttending={isAttending!}
				/>
				<EventDetailInfo event={selectedEvent!} />
				<EventChatRoom />
			</Grid.Column>

			<Grid.Column width={6}>
				<EventDetailSidebar
					attendees={selectedEvent!.attendees}
					hostUid={selectedEvent!.hostUid}
				/>
			</Grid.Column>
		</Grid>
	);
};

export default EventDetailPage;

import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import { useTypedSelector } from "../../../app/store/hooks";
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

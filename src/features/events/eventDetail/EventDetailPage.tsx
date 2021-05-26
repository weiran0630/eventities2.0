import React from "react";
import { Grid } from "semantic-ui-react";
import EventChatRoom from "./EventChatRoom";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";

const EventDetailPage: React.FC = () => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailHeader />
				<EventDetailInfo />
				<EventChatRoom />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailSidebar />
			</Grid.Column>
		</Grid>
	);
};

export default EventDetailPage;

import React from "react";
import { List, Image } from "semantic-ui-react";

import { Attendee } from "../../../app/common/model/interfaces";

interface EventListAttendeeProps {
	attendee: Attendee;
}

const EventListAttendee: React.FC<EventListAttendeeProps> = ({ attendee }) => {
	return (
		<List.Item>
			<Image size="mini" circular src={attendee.photoURL} />
		</List.Item>
	);
};

export default EventListAttendee;

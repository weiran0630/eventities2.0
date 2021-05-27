import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";
import { format } from "date-fns";

import { Event } from "../../../app/common/model/interfaces";

const iconStyle = {
	margin: "0.3em 0.5em 0.3em 0.3em",
};

interface EventDetailInfoProps {
	event: Event;
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({ event }) => {
	return (
		<Segment.Group>
			<Segment attached clearing>
				<Icon color="teal" name="info" style={iconStyle} />
				{event.description}
			</Segment>

			<Segment attached clearing>
				<Icon name="calendar" color="teal" style={iconStyle} />
				<span>{format(event.date, "MMMM d yyyy, h:mm a")}</span>
			</Segment>

			<Segment attached clearing>
				<Icon name="marker" color="teal" style={iconStyle} />
				<span style={{ display: "inline-block", marginBottom: "0.5em" }}>
					{event.venue}
				</span>
				<Button floated="right" color="teal" size="tiny" content="地圖" />
			</Segment>
		</Segment.Group>
	);
};

export default EventDetailInfo;

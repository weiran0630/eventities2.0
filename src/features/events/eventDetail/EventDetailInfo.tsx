import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

const iconStyle = {
	margin: "0.3em 0.5em 0.3em 0.3em",
};

const EventDetailInfo: React.FC = () => {
	return (
		<Segment.Group>
			<Segment attached clearing>
				<Icon color="teal" name="info" style={iconStyle} />
				Event Description
			</Segment>
			<Segment attached clearing>
				<Icon name="calendar" color="teal" style={iconStyle} />
				<span>Event Date</span>
			</Segment>
			<Segment attached clearing>
				<Icon name="marker" color="teal" style={iconStyle} />
				<span>Event Venue</span>
				<Button floated="right" color="teal" size="tiny" content="地圖" />
			</Segment>
		</Segment.Group>
	);
};

export default EventDetailInfo;

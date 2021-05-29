import React, { useState } from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

import { Event } from "../../../app/common/model/interfaces";
import EventMap from "./EventMap";

const iconStyle = {
	margin: "0.3em 0.5em 0.3em 0.3em",
};

interface EventDetailInfoProps {
	event: Event;
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({ event }) => {
	const [mapVisible, setMapVisible] = useState(false);

	return (
		<Segment.Group>
			<Segment attached clearing>
				<Icon color="teal" name="info" style={iconStyle} />
				{event.description}
			</Segment>

			<Segment attached clearing>
				<Icon name="calendar" color="teal" style={iconStyle} />
				<span>{event.date}</span>
			</Segment>

			<Segment attached clearing>
				<Icon name="marker" color="teal" style={iconStyle} />
				<span style={{ display: "inline-block", marginBottom: "0.5em" }}>
					{event.venue.address}
				</span>
				<Button
					onClick={() => setMapVisible(!mapVisible)}
					floated="right"
					color="teal"
					size="tiny"
					content={mapVisible ? "關閉地圖" : "顯示地圖"}
				/>
			</Segment>

			{mapVisible ? <EventMap center={event.venue.latLng} /> : null}
		</Segment.Group>
	);
};

export default EventDetailInfo;

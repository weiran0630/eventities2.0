import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import { Event } from "../../../app/model/interfaces";
import EventListAttendee from "./EventListAttendee";

interface EventListItemProps {
	event: Event;
	deleteEvent: (id: string) => void;
}

const EventListItem: React.FC<EventListItemProps> = ({
	event,
	deleteEvent,
}) => {
	const { title, date, description, venue, hostedBy, hostPhotoURL, attendees } =
		event;

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size="tiny" circular src={hostPhotoURL} />
						<Item.Content>
							<Item.Header content={title} />
							<Item.Description>{`舉辦人：${hostedBy}`}</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>

			<Segment>
				<span>
					<Icon name="clock" color="teal" /> {date}
					<Icon
						name="marker"
						color="teal"
						style={{ marginLeft: "0.5em" }}
					/>{" "}
					{venue}
				</span>
			</Segment>

			<Segment secondary>
				<List horizontal>
					{attendees.map((attendee) => (
						<EventListAttendee key={attendee.id} attendee={attendee} />
					))}
				</List>
			</Segment>

			<Segment clearing>
				<div>{description}</div>
				<Button
					as={Link}
					to={`/events/${event.id}`}
					color="teal"
					floated="right"
					content="檢視"
					style={{ marginTop: "1em", marginLeft: "0.5em" }}
				/>
				<Button
					onClick={() => {
						deleteEvent(event.id);
					}}
					basic
					color="red"
					floated="right"
					content="刪除"
					style={{ marginTop: "1em", marginLeft: "0.5em" }}
				/>
			</Segment>
		</Segment.Group>
	);
};

export default EventListItem;

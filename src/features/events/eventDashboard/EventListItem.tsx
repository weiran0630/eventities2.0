import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";

import { Event } from "../../../app/common/model/interfaces";
import { useTypedDispatch } from "../../../app/store/hooks";
import { deleteEvent } from "../../../app/store/slice/eventSlice";
import EventListAttendee from "./EventListAttendee";

interface EventListItemProps {
	event: Event;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
	const dispatch = useTypedDispatch();

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size="tiny" circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header content={event.title} />
							<Item.Description>{`舉辦人：${event.hostedBy}`}</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>

			<Segment>
				<span>
					<Icon name="clock" color="teal" /> {event.date}
					<Icon
						name="marker"
						color="teal"
						style={{ marginLeft: "0.5em" }}
					/>{" "}
					{event.venue}
				</span>
			</Segment>

			<Segment secondary>
				<List horizontal>
					{event.attendees.map((attendee) => (
						<EventListAttendee key={attendee.id} attendee={attendee} />
					))}
				</List>
			</Segment>

			<Segment clearing>
				<div>{event.description}</div>
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
						dispatch(deleteEvent(event.id));
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

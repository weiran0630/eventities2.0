import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import { format } from "date-fns";

import { Event } from "../../../app/common/model/interfaces";
import EventListAttendee from "./EventListAttendee";
import { deleteEventFromFirestore } from "../../../app/firestore/firestoreService";

interface EventListItemProps {
	event: Event;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size="tiny" circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header content={event.title} />
							<Item.Description>{`舉辦人：${event.hostedBy}`}</Item.Description>
							{event.isCancelled && (
								<Label
									style={{ top: "-40px" }}
									ribbon="right"
									color="grey"
									content="此活動已被暫時取消"
								/>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>

			<Segment>
				<span>
					<Icon name="clock" color="teal" />{" "}
					{format(event.date, "MMMM d, yyyy h:mm a")}
					<Icon
						name="marker"
						color="teal"
						style={{ marginLeft: "0.5em" }}
					/>{" "}
					{event.venue.address}
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
					onClick={async () => {
						await deleteEventFromFirestore(event);
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

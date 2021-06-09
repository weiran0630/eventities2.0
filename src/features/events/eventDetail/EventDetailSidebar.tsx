import React from "react";
import { Item, Segment } from "semantic-ui-react";

import { Attendee } from "../../../app/common/model/interfaces";

interface EventDetailSidebarProps {
	attendees: Attendee[];
}

const EventDetailSidebar: React.FC<EventDetailSidebarProps> = ({
	attendees,
}) => {
	return (
		<>
			<Segment
				textAlign="center"
				style={{ border: "none" }}
				attached="top"
				secondary
				inverted
				color="teal"
			>
				參加人數：{attendees.length}
			</Segment>

			<Segment attached>
				<Item.Group relaxed divided>
					{attendees.map((attendee) => (
						<Item key={attendee.id} style={{ position: "relative" }}>
							<Item.Image
								size="tiny"
								src={attendee.photoURL ? attendee.photoURL : "/assets/user.png"}
							/>
							<Item.Content verticalAlign="middle">
								<Item.Header as="h3">
									<span>{attendee.displayName}</span>
								</Item.Header>
							</Item.Content>
						</Item>
					))}
				</Item.Group>
			</Segment>
		</>
	);
};

export default EventDetailSidebar;

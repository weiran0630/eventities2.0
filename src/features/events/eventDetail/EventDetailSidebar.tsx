import React from "react";
import { Link } from "react-router-dom";
import { Item, Label, Segment } from "semantic-ui-react";

import { Attendee } from "../../../app/common/model/interfaces";

interface EventDetailSidebarProps {
	attendees: Attendee[];
	hostUid: string;
}

const EventDetailSidebar: React.FC<EventDetailSidebarProps> = ({
	attendees,
	hostUid,
}) => {
	return (
		<>
			<Segment
				textAlign="center"
				style={{ border: "none" }}
				attached="top"
				secondary
				inverted
				color="teal">
				參加人數：{attendees.length}
			</Segment>

			<Segment attached>
				<Item.Group relaxed divided>
					{attendees.map((attendee) => (
						<Item
							as={Link}
							to={`/profile/${attendee.id}`}
							key={attendee.id}
							style={{ position: "relative" }}>
							{attendee.id === hostUid && (
								<Label
									style={{ position: "absolute" }}
									ribbon="right"
									color="orange"
									content="主持人"
								/>
							)}

							<Item.Image
								circular
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

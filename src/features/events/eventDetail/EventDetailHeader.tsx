import React from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";

import { Event } from "../../../app/common/model/interfaces";

const eventImageStyle = {
	filter: "brightness(30%)",
};

const eventImageTextStyle = {
	position: "absolute",
	bottom: "5%",
	left: "5%",
	width: "100%",
	height: "auto",
	color: "white",
};

interface EventDetailHeaderProps {
	event: Event;
}

const EventDetailHeader: React.FC<EventDetailHeaderProps> = ({ event }) => {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: "0" }}>
				<Image
					src={`/assets/categoryImages/${event.category}.jpg`}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content={event.title}
									style={{ color: "white" }}
								/>
								<p>活動日期：{event.date}</p>
								<p>
									舉辦人：<strong>{event.hostedBy}</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached="bottom" clearing>
				<Button>取消報名</Button>
				<Button color="teal">報名參加</Button>
				<Button
					as={Link}
					to={`/manage/${event.id}`}
					color="orange"
					floated="right"
				>
					管理活動
				</Button>
			</Segment>
		</Segment.Group>
	);
};

export default EventDetailHeader;

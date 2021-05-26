import React from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";

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

const EventDetailHeader: React.FC = () => {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: "0" }}>
				<Image
					src={`/assets/categoryImages/drinks.jpg`}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content="Event Title"
									style={{ color: "white" }}
								/>
								<p>活動日期</p>
								<p>
									舉辦人：<strong>Bob</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached="bottom" clearing>
				<Button>取消報名</Button>
				<Button color="teal">報名參加</Button>
				<Button as={Link} to={`/manage/`} color="orange" floated="right">
					管理活動
				</Button>
			</Segment>
		</Segment.Group>
	);
};

export default EventDetailHeader;

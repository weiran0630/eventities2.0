import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";
import { format } from "date-fns";

import { Event } from "../../../app/common/model/interfaces";
import { toast } from "react-toastify";
import {
	addUserAttendance,
	cancelUserAttendance,
} from "../../../app/firestore/firestoreService";

const eventImageStyle = {
	filter: "brightness(30%)",
};

const eventImageTextStyle = {
	position: "absolute",
	bottom: "5%",
	left: "5%",
	width: "auto",
	height: "auto",
	color: "white",
};

const eventButtonStyle = {
	position: "absolute",
	bottom: "10%",
	right: "5%",
	width: "auto",
	height: "auto",
};
interface EventDetailHeaderProps {
	event: Event;
	isHost: boolean;
	isAttending: boolean;
}

const EventDetailHeader: React.FC<EventDetailHeaderProps> = ({
	event,
	isHost,
	isAttending,
}) => {
	const [loading, setLoading] = useState(false);

	const handleUserAttend = async () => {
		setLoading(true);
		try {
			await addUserAttendance(event);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleUserCancel = async () => {
		setLoading(true);
		try {
			await cancelUserAttendance(event);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

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
								<p>活動日期：{format(event.date, "MMMM d, yyyy h:mm a")}</p>

								<p>
									主持人：
									<strong>
										<Link
											to={`/profile/${event.hostUid}`}
											style={{ textDecoration: "underline", color: "inherit" }}>
											{event.hostedBy}
										</Link>
									</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>

				<Segment basic style={eventButtonStyle}>
					{!isHost && (
						<>
							{isAttending ? (
								<Button
									loading={loading}
									onClick={handleUserCancel}
									color="red"
									floated="right">
									取消報名
								</Button>
							) : (
								<Button
									loading={loading}
									onClick={handleUserAttend}
									color="green"
									floated="right">
									報名參加
								</Button>
							)}
						</>
					)}

					{isHost && (
						<Button
							as={Link}
							to={`/manage/${event.id}`}
							color="orange"
							floated="right">
							管理活動
						</Button>
					)}
				</Segment>
			</Segment>
		</Segment.Group>
	);
};

export default EventDetailHeader;

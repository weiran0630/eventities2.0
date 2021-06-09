import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Comment } from "semantic-ui-react";
import { formatDistance } from "date-fns";

import {
	firebaseObjectToArray,
	getEventChatRef,
} from "../../../app/firestore/firebaseService";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import {
	clearEventChat,
	listenToEventChat,
} from "../../../app/store/slice/eventSlice";
import EventChatForm from "./EventChatForm";

interface EventChatRoomProps {
	eventId: string;
}

const EventChatRoom: React.FC<EventChatRoomProps> = ({ eventId }) => {
	const { comments } = useTypedSelector((state) => state.event);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		getEventChatRef(eventId).on("value", (snapshot) => {
			if (!snapshot.exists()) return;
			dispatch(
				listenToEventChat(firebaseObjectToArray(snapshot.val())?.reverse())
			);
		});
		return () => {
			dispatch(clearEventChat()); // clean up chats inside local store when component un-mount
			getEventChatRef().off();
		};
	}, [eventId, dispatch]);

	return (
		<>
			<Segment
				textAlign="center"
				attached="top"
				inverted
				color="teal"
				style={{ border: "none" }}>
				<Header>Live 聊天室 💬️</Header>
			</Segment>

			<Segment attached>
				<EventChatForm eventId={eventId} />

				<Comment.Group>
					{comments.map((comment) => (
						<Comment key={comment.id}>
							<Comment.Avatar src={comment.photoURL || "/assets/user.png"} />

							<Comment.Content>
								<Comment.Author as={Link} to={`/profile/${comment.uid}`}>
									{comment.displayName}
								</Comment.Author>

								<Comment.Metadata>
									<div>{formatDistance(comment.date, new Date())}</div>
								</Comment.Metadata>

								<Comment.Text>
									{comment.text.split("\n").map((text: string, i: number) => (
										<span>
											{text}
											<br />
										</span>
									))}
								</Comment.Text>

								<Comment.Actions>
									<Comment.Action>回覆</Comment.Action>
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					))}
				</Comment.Group>
			</Segment>
		</>
	);
};

export default EventChatRoom;

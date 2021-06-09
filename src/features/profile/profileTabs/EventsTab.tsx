import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	Grid,
	Header,
	Icon,
	Tab,
	TabProps,
	Image,
} from "semantic-ui-react";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { Event } from "../../../app/common/model/interfaces";
import { listenToUserEvents } from "../../../app/store/slice/profileSlice";
import { getUserEventsQuery } from "../../../app/firestore/firestoreService";
import { format } from "date-fns";

interface EventsTabProps {
	profile: {
		id: string;
		displayName: string;
		description: string;
		createdAt: Date;
	};
}

const EventsTab: React.FC<EventsTabProps> = ({ profile }) => {
	const [activeTab, setActiveTab] = useState<number | string>(0);
	const { profileEvents } = useTypedSelector((state) => state.profile);
	const { loading } = useTypedSelector((state) => state.async);
	const dispatch = useTypedDispatch();

	useFirestoreCollection({
		query: () => getUserEventsQuery(activeTab, profile.id),
		data: (events: Event[]) => dispatch(listenToUserEvents(events)),
		dependencies: [dispatch, activeTab, profile.id],
	});

	const panes = [
		{ menuItem: "未來活動", pane: { key: "future" } },
		{ menuItem: "過去活動", pane: { key: "past" } },
		{ menuItem: "主辦中", pane: { key: "hosting" } },
	];

	return (
		<Tab.Pane loading={loading}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated="left">
						<Icon name="calendar" color="teal" />
						活動
					</Header>
				</Grid.Column>

				<Grid.Column width={16}>
					<Tab
						onTabChange={(event, data: TabProps) =>
							setActiveTab(data.activeIndex!)
						}
						activeIndex={activeTab}
						panes={panes}
						menu={{ secondary: true, pointing: true, color: "teal" }}
					/>

					<Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
						{profileEvents.map((event) => (
							<Card key={event.id} as={Link} to={`/events/${event.id}`}>
								<Image
									src={`/assets/categoryImages/${event.category}.jpg`}
									style={{ minHeight: 100, objectFit: "cover" }}
								/>

								<Card.Content>
									<Card.Header content={event.title} textAlign="center" />

									<Card.Meta textAlign="center">
										<div style={{ marginTop: 5 }}>
											{format(event.date, "dd MMM yyyy")}
										</div>
										<div style={{ marginTop: 5 }}>
											{format(event.date, "HH:mm")}
										</div>
									</Card.Meta>
								</Card.Content>
							</Card>
						))}
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default EventsTab;

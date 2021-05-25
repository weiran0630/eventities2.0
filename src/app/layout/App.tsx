import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import { Event } from "../../app/model/interfaces";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

const App: React.FC = () => {
	const [formVisible, setFormVisible] = useState(false);
	const [selectedEvent, setSelectedEvent] =
		useState<Event | undefined>(undefined);

	const handleSelectedEvent = (event: Event | undefined) => {
		setSelectedEvent(event);
		setFormVisible(true);
	};

	const handleCreateFormVisible = () => {
		setSelectedEvent(undefined);
		setFormVisible(true);
	};

	return (
		<>
			<NavBar handleFormVisible={handleCreateFormVisible} />
			<Container className="main">
				<EventDashboard
					formVisible={formVisible}
					setFormVisible={setFormVisible}
					selectedEvent={selectedEvent}
					setSelectedEvent={handleSelectedEvent}
				/>
			</Container>
		</>
	);
};

export default App;

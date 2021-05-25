import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

const App: React.FC = () => {
	const [formVisible, setFormVisible] = useState(false);

	const handleFormVisible = () => {
		setFormVisible(!formVisible);
	};

	return (
		<>
			<NavBar handleFormVisible={handleFormVisible} />
			<Container className="main">
				<EventDashboard
					handleFormVisible={handleFormVisible}
					formVisible={formVisible}
				/>
			</Container>
		</>
	);
};

export default App;

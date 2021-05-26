import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailPage from "../../features/events/eventDetail/EventDetailPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";

const App: React.FC = () => {
	return (
		<>
			<Route exact path="/" component={HomePage} />
			<Route
				path={"/(.+)"}
				render={() => (
					<>
						<NavBar />
						<Container className="main">
							<Route exact path="/events" component={EventDashboard} />
							<Route path="/events/:id" component={EventDetailPage} />
							<Route path={["/create", "/manage"]} component={EventForm} />
						</Container>
					</>
				)}
			/>
		</>
	);
};

export default App;

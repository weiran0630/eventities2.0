import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import LoadingComponent from "../common/loadingComponent";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailPage from "../../features/events/eventDetail/EventDetailPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modal/ModalManager";
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import { useTypedSelector } from "../store/hooks";

const App: React.FC = () => {
	const { initialized } = useTypedSelector((state) => state.async);

	/** prevent any component render until app is actually  initialized */
	if (!initialized) return <LoadingComponent content="載入中" />;

	return (
		<>
			<ModalManager />
			<ToastContainer position="bottom-right" hideProgressBar />
			<Route exact path="/" component={HomePage} />
			{/* render below only when path matches regex */}
			<Route
				path={"/(.+)"}
				render={() => (
					<>
						<NavBar />
						<Container className="main">
							<Route exact path="/events" component={EventDashboard} />
							<Route path="/events/:id" component={EventDetailPage} />
							<Route path="/sandbox" component={Sandbox} />
							<Route path="/account" component={AccountPage} />
							<Route path={["/create", "/manage/:id"]} component={EventForm} />
							<Route path="/error" component={ErrorComponent} />
						</Container>
					</>
				)}
			/>
		</>
	);
};

export default App;

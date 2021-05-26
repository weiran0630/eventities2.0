import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

const HomePage: React.FC = () => {
	return (
		<Segment inverted textAlign="center" vertical className="landing">
			<Container>
				<Header as="h1" inverted>
					<Image
						size="massive"
						src="/assets/logo.png"
						style={{ marginBottom: "12px" }}
					/>
					Eventities
				</Header>
				<h2 style={{ marginBottom: "2em" }}>
					基於活動的嶄新社交平臺，
					<br />
					點擊立即加入！
				</h2>
				<Button
					as={Link}
					to="/events"
					size="huge"
					content="開始探索"
					inverted
				/>
			</Container>
		</Segment>
	);
};

export default HomePage;

import React, { useState } from "react";
import {
	Button,
	Card,
	Grid,
	Header,
	Icon,
	Tab,
	Image,
} from "semantic-ui-react";

interface AboutTabProps {
	profile: {
		displayName: string;
		description: string;
		createdAt: Date;
	};
	isCurrentUser: boolean;
}

const AboutTab: React.FC<AboutTabProps> = ({ profile, isCurrentUser }) => {
	const [editMode, setEditMode] = useState(false);

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated="left">
						<Icon name="user" color="teal" />
						照片
					</Header>

					{isCurrentUser && (
						<Button
							basic={editMode}
							color={editMode ? "red" : "green"}
							floated="right"
							onClick={() => setEditMode(!editMode)}
							content={editMode ? "取消" : "新增照片"}
						/>
					)}
				</Grid.Column>

				<Grid.Column width={16}>
					{editMode ? (
						<p>Photo Widgets</p>
					) : (
						<Card.Group itemsPerRow={5}>
							<Image src={"/assets/user.png"} />

							<Button.Group fluid width={2}>
								<Button basic color="green" content="主要" />
								<Button basic color="red" icon="trash" />
							</Button.Group>
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default AboutTab;

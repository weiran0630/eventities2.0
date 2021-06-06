import React from "react";
import {
	Grid,
	Header,
	Item,
	Reveal,
	Segment,
	Statistic,
	Divider,
	Button,
} from "semantic-ui-react";

interface ProfileHeaderProps {
	profile: {
		displayName: string;
		photoURL: string;
	};
	isCurrentUser: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	profile,
	isCurrentUser,
}) => {
	return (
		<Segment padded>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size="small"
								src={profile.photoURL || "/assets/user.png"}
							/>
							<Item.Content verticalAlign="middle">
								<Header
									as="h1"
									style={{ display: "block", marginBottom: 10 }}
									content={profile.displayName}
								/>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>

				<Grid.Column width={4}>
					<Statistic.Group color="teal" style={{ marginBottom: 10 }}>
						<Statistic label="追蹤數" value={10} />
						<Statistic label="追蹤中" value={87} />
					</Statistic.Group>

					{!isCurrentUser && (
						<>
							<Divider />
							<Reveal animated="move down">
								<Reveal.Content visible style={{ width: "100%" }}>
									<Button fluid color="teal" content="追蹤中" />
								</Reveal.Content>
								<Reveal.Content hidden style={{ width: "100%" }}>
									<Button basic fluid color="red" content="取消追蹤" />
								</Reveal.Content>
							</Reveal>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default ProfileHeader;

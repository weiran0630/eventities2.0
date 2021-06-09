import React, { useState } from "react";
import { format } from "date-fns";
import { Button, Grid, Header, Icon, Tab } from "semantic-ui-react";

import AboutForm from "../profileForm/AboutForm";

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
						{`關於 ${profile.displayName}`}
					</Header>

					{isCurrentUser && (
						<Button
							basic={editMode}
							color={editMode ? "red" : "green"}
							floated="right"
							onClick={() => setEditMode(!editMode)}
							content={editMode ? "取消" : "修改關於"}
						/>
					)}
				</Grid.Column>

				<Grid.Column width={16}>
					{editMode ? (
						<AboutForm profile={profile} setEditMode={setEditMode} />
					) : (
						<>
							<div>
								<strong>
									加入日期：{format(profile.createdAt, "dd MMM yyyy")}
								</strong>

								<div style={{ marginTop: 10 }}>
									{profile.description
										.split("\n") // create new line with every \n
										.map((text: string, i: number) => (
											<span>
												{text}
												<br />
											</span>
										)) || <em>點選修改頁面加入您的個人簡介</em>}
								</div>
							</div>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default AboutTab;

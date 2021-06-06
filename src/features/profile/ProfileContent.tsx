import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./profileTabs/AboutTab";

interface ProfileContentProps {
	profile: any;
	isCurrentUser: boolean;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
	profile,
	isCurrentUser,
}) => {
	const panes = [
		{
			menuItem: "關於",
			render: () => (
				<AboutTab profile={profile} isCurrentUser={isCurrentUser} />
			),
		},
		{ menuItem: "照片", render: () => <Tab.Pane>照片</Tab.Pane> },
		{ menuItem: "活動", render: () => <Tab.Pane>活動</Tab.Pane> },
		{ menuItem: "追蹤者", render: () => <Tab.Pane>追蹤者</Tab.Pane> },
		{ menuItem: "追蹤中", render: () => <Tab.Pane>追蹤中</Tab.Pane> },
	];

	return (
		<Tab
			menu={{
				color: "teal",
				borderless: true,
				attached: true,
				inverted: true,
				fluid: true,
			}}
			style={{ borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }}
			panes={panes}
		></Tab>
	);
};

export default ProfileContent;

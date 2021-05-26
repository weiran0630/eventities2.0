import React from "react";
import { Button, Menu } from "semantic-ui-react";

interface SignedOutMenuProps {
	setAuthenticated: (value: boolean) => void;
}

const SignedOutMenu: React.FC<SignedOutMenuProps> = ({ setAuthenticated }) => {
	return (
		<Menu.Item position="right">
			<Button
				onClick={() => setAuthenticated(true)}
				basic
				inverted
				content="登錄"
			/>
			<Button basic inverted content="註冊" style={{ marginLeft: "0.5em" }} />
		</Menu.Item>
	);
};

export default SignedOutMenu;

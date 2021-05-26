import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

interface SignedInMenuProps {
	signOut: () => void;
}

const SignedInMenu: React.FC<SignedInMenuProps> = ({ signOut }) => {
	return (
		<Menu.Item position="right">
			<Image avatar spaced="right" src="/assets/user.png" />
			<Dropdown pointing="top left" text="Bob">
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to="/form" text="新增活動" icon="plus" />
					<Dropdown.Item text="我的帳號" icon="user" />
					<Dropdown.Item onClick={signOut} text="登出" icon="power" />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
};

export default SignedInMenu;

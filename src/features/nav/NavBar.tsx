import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface NavBarProps {
	handleFormVisible: (value: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ handleFormVisible }) => {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>
					<img
						src="/assets/logo.png"
						alt="logo"
						style={{ marginRight: "1em" }}
					/>
					Eventities
				</Menu.Item>
				<Menu.Item name="所有活動" />
				<Menu.Item>
					<Button
						positive
						inverted
						content="新增活動"
						onClick={() => handleFormVisible(true)}
					/>
				</Menu.Item>
				<Menu.Item position="right">
					<Button basic inverted content="登錄" />
					<Button
						basic
						inverted
						content="註冊"
						style={{ marginLeft: "0.5em" }}
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default NavBar;

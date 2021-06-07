import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

import { useTypedSelector } from "../../app/store/hooks";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const NavBar: React.FC = () => {
	const authenticated = useTypedSelector((state) => state.auth.authenticated);

	return (
		<Menu inverted borderless fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<img
						src="/assets/icon.png"
						alt="logo"
						style={{ marginRight: "1em" }}
					/>
					Eventities
				</Menu.Item>

				<Menu.Item as={NavLink} to="/events" name="所有活動" />

				<Menu.Item as={NavLink} to="/sandbox" name="Sandbox" />

				{authenticated && (
					<Menu.Item as={NavLink} to="/create">
						<Button positive inverted content="新增活動" />
					</Menu.Item>
				)}

				{authenticated ? <SignedInMenu /> : <SignedOutMenu />}
			</Container>
		</Menu>
	);
};

export default NavBar;

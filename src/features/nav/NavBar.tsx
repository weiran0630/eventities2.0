import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const NavBar: React.FC = () => {
	const history = useHistory(); // access history object without wrapper in Route component
	const [authenticated, setAuthenticated] = useState(false);

	const handleSignOut = () => {
		setAuthenticated(false);
		history.push("/");
	};

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<img
						src="/assets/logo.png"
						alt="logo"
						style={{ marginRight: "1em" }}
					/>
					Eventities
				</Menu.Item>

				<Menu.Item as={NavLink} to="/events" name="所有活動" />
				{authenticated && (
					<Menu.Item as={NavLink} to="/create">
						<Button positive inverted content="新增活動" />
					</Menu.Item>
				)}

				{authenticated ? (
					<SignedInMenu signOut={handleSignOut} />
				) : (
					<SignedOutMenu setAuthenticated={setAuthenticated} />
				)}
			</Container>
		</Menu>
	);
};

export default NavBar;

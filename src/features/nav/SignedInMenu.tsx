import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

import { useTypedDispatch, useTypedSelector } from "../../app/store/hooks";
import { singOut } from "../../app/store/slice/authSlice";

const SignedInMenu: React.FC = () => {
	const history = useHistory(); // access history object without wrapper in Route component
	const currentUser = useTypedSelector((state) => state.auth.currentUser);
	const dispatch = useTypedDispatch();

	const handleSignOut = () => {
		dispatch(singOut());
		history.push("/");
	};
	return (
		<Menu.Item position="right">
			<Image
				avatar
				spaced="right"
				src={currentUser!.photoURL || "/assets/user.png"}
			/>
			<Dropdown pointing="top left" text={currentUser!.email}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to="/form" text="新增活動" icon="plus" />
					<Dropdown.Item text="我的帳號" icon="user" />
					<Dropdown.Item onClick={handleSignOut} text="登出" icon="power" />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
};

export default SignedInMenu;

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, Image, Dropdown } from "semantic-ui-react";

import { signOut } from "../../app/firestore/firebaseService";
import { useTypedSelector } from "../../app/store/hooks";

const SignedInMenu: React.FC = () => {
	const history = useHistory(); // hook: useHistory() access history object without wrapper in Route component
	const { currentUserProfile } = useTypedSelector((state) => state.profile);

	const handleSignOut = async () => {
		try {
			history.push("/");
			await signOut();
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<Menu.Item position="right">
			<Image
				avatar
				spaced="right"
				src={currentUserProfile?.photoURL || "/assets/user.png"}
			/>

			<Dropdown pointing="top left" text={currentUserProfile?.displayName}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to="/create" text="新增活動" icon="plus" />
					<Dropdown.Item
						as={Link}
						to={`/profile/${currentUserProfile?.id}`}
						text="我的頁面"
						icon="user"
					/>
					<Dropdown.Item
						as={Link}
						to="/account"
						text="我的帳號"
						icon="setting"
					/>
					<Dropdown.Item onClick={handleSignOut} text="登出" icon="power" />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
};

export default SignedInMenu;

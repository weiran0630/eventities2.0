import React from "react";
import { Button, Menu } from "semantic-ui-react";

import { useTypedDispatch } from "../../app/store/hooks";
import { openModal } from "../../app/store/slice/modalSlice";

const SignedOutMenu: React.FC = () => {
	const dispatch = useTypedDispatch();
	return (
		<Menu.Item position="right">
			<Button
				onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
				basic
				inverted
				content="登錄"
			/>

			<Button
				onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
				basic
				inverted
				content="註冊"
				style={{ marginLeft: "0.5em" }}
			/>
		</Menu.Item>
	);
};

export default SignedOutMenu;

import React from "react";
import { Button } from "semantic-ui-react";
import { useTypedDispatch } from "../../app/store/hooks";
import { closeModal } from "../../app/store/slice/modalSlice";
import { socialLogin } from "../../app/firestore/firebaseService";

const SocialLogin: React.FC = () => {
	const dispatch = useTypedDispatch();

	const handleSocialLogin = (provider: string) => {
		dispatch(closeModal());
		socialLogin(provider);
	};

	return (
		<>
			{/* <Button
				fluid
				icon="facebook"
				color="facebook"
				style={{ marginBottom: 10 }}
				content="以 Facebook 帳號登入"
			/> */}
			<Button
				fluid
				onClick={() => handleSocialLogin("google")}
				icon="google"
				color="google plus"
				content="以 Google 帳號登入"
			/>
		</>
	);
};

export default SocialLogin;

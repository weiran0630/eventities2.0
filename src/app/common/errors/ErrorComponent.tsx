import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";

const ErrorComponent: React.FC = () => {
	return (
		<Segment placeholder>
			<Header
				textAlign="center"
				content="Oops，發生未知錯誤，請聯絡開發人員協助改善網頁"
			/>
			<Button
				as={Link}
				to="/events"
				primary
				style={{ marginTop: "20px" }}
				content="返回活動頁"
			/>
		</Segment>
	);
};

export default ErrorComponent;

import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingComponentProps {
	inverted?: boolean;
	content?: string;
}
const LoadingComponent: React.FC<LoadingComponentProps> = ({
	inverted = true,
	content = "Loading...",
}) => {
	return (
		<Dimmer inverted={inverted} active>
			<Loader content={content} />
		</Dimmer>
	);
};

export default LoadingComponent;

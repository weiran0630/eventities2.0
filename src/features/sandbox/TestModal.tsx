import React from "react";
import ModalWrapper from "../../app/common/modal/ModalWrapper";

interface TestModalProps {
	count: number;
}

const TestModal: React.FC<TestModalProps> = ({ count }) => {
	return (
		<ModalWrapper size="mini" header="Test Modal">
			<div>The data is: {count}</div>
		</ModalWrapper>
	);
};

export default TestModal;

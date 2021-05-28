import React from "react";

import { useTypedSelector } from "../../store/hooks";
import TestModal from "../../../features/sandbox/TestModal";
import LoginForm from "../../../features/auth/LoginForm";

const ModalManager: React.FC = () => {
	const currentModal = useTypedSelector((state) => state.modals);

	const modalLookup: any = { TestModal, LoginForm };

	let renderedModal;

	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];
		renderedModal = <ModalComponent {...modalProps} />;
	}

	return <span>{renderedModal}</span>;
};

export default ModalManager;

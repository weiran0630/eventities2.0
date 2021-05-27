import React from "react";
import { useTypedSelector } from "../../store/hooks";
import TestModal from "../../../features/sandbox/TestModal";

const ModalManager = () => {
	const modalLookup: any = { TestModal };
	const currentModal = useTypedSelector((state) => state.modals);
	let renderedModal;
	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];
		renderedModal = <ModalComponent {...modalProps} />;
	}
	return <span>{renderedModal}</span>;
};

export default ModalManager;

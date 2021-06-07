import React, { ReactNode, useEffect } from "react";
import { Modal } from "semantic-ui-react";

import { useTypedDispatch } from "../../store/hooks";
import { closeModal } from "../../store/slice/modalSlice";

type ModalWrapperProps = {
	children?: ReactNode;
	size: "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined;
	header: string;
};
const ModalWrapper: React.FC<ModalWrapperProps> = ({
	children,
	size,
	header,
}) => {
	const dispatch = useTypedDispatch();
	const [open, setOpen] = React.useState(true);

	useEffect(() => {
		return () => {
			dispatch(closeModal());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size={size}
		>
			{header && <Modal.Header>{header}</Modal.Header>}

			<Modal.Content>{children}</Modal.Content>
		</Modal>
	);
};

export default ModalWrapper;

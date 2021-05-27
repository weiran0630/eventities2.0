import React from "react";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "../../app/store/slice/sandboxSlice";
import { openModal } from "../../app/store/slice/modalSlice";
import { useTypedDispatch, useTypedSelector } from "../../app/store/hooks";

const Sandbox: React.FC = () => {
	const dispatch = useTypedDispatch();
	const count = useTypedSelector((state) => state.sandbox.count);

	return (
		<>
			<h1>Testing 123</h1>
			<h3>The data is: {count}</h3>
			<Button
				onClick={() => dispatch(increment())}
				content="Increment"
				color="green"
			/>
			<Button
				onClick={() => dispatch(decrement())}
				content="Decrement"
				color="red"
			/>
			<Button
				onClick={() =>
					dispatch(openModal({ modalType: "TestModal", modalProps: { count } }))
				}
				content="Open Modal"
				color="teal"
			/>
		</>
	);
};

export default Sandbox;

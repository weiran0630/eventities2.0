import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "../../app/store/slice/sandboxSlice";
import { openModal } from "../../app/store/slice/modalSlice";
import { useTypedDispatch, useTypedSelector } from "../../app/store/hooks";
import TestPlacesInput from "./TestPlacesInput";
import TestMap from "./TestMap";

const Sandbox: React.FC = () => {
	const count = useTypedSelector((state) => state.sandbox.count);
	const dispatch = useTypedDispatch();
	const [latLng, setLatLng] = useState({ lat: 59.95, lng: 30.33 });

	return (
		<>
			<h1>Testing 123123</h1>
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
			<div style={{ marginTop: "15px" }}>
				<TestPlacesInput setLatLng={setLatLng} />
				<TestMap center={latLng} />
			</div>
		</>
	);
};

export default Sandbox;

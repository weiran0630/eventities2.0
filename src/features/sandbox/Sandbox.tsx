import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import {
	increment,
	decrement,
	delayedIncrementWithValue,
	delayedDecrementWithValue,
} from "../../app/store/slice/sandboxSlice";
import { openModal } from "../../app/store/slice/modalSlice";
import { useTypedDispatch, useTypedSelector } from "../../app/store/hooks";
// import TestPlacesInput from "./TestPlacesInput";
// import TestMap from "./TestMap";

const Sandbox: React.FC = () => {
	const count = useTypedSelector((state) => state.sandbox.count);
	const { loading } = useTypedSelector((state) => state.async);
	const dispatch = useTypedDispatch();
	// const [latLng, setLatLng] = useState({ lat: 59.95, lng: 30.33 });
	const [target, setTarget] = useState<null | string>(null);

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
				name="delayedInc"
				loading={loading && target === "delayedInc"}
				onClick={async (e) => {
					setTarget(e.currentTarget.name);
					await dispatch(delayedIncrementWithValue(123));
				}}
				content="Increment with Delay"
				color="orange"
			/>

			<Button
				name="delayedDec"
				loading={loading && target === "delayedDec"}
				onClick={async (e) => {
					setTarget(e.currentTarget.name);
					await dispatch(delayedDecrementWithValue(456));
				}}
				content="Decrement with Delay"
				color="blue"
			/>

			<Button
				onClick={() =>
					dispatch(openModal({ modalType: "TestModal", modalProps: { count } }))
				}
				content="Open Modal"
				color="teal"
			/>

			{/* <div style={{ marginTop: "15px" }}>
				<TestPlacesInput setLatLng={setLatLng} />
				<TestMap center={latLng} />
			</div> */}
		</>
	);
};

export default Sandbox;

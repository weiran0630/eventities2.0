import React from "react";
import GoogleMapReact from "google-map-react";
import { apiKey } from "../../app/API/googleApis";

interface AnyReactComponentProps {
	lat: number;
	lng: number;
	text: string;
}
const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => (
	<div>{text}</div>
);

interface TestMapProps {
	center?: {
		lat: number;
		lng: number;
	};
	zoom?: number;
}

const TestMap: React.FC<TestMapProps> = ({ center, zoom = 11 }) => {
	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "100vh", width: "100%" }}>
			<GoogleMapReact
				center={center}
				bootstrapURLKeys={{ key: apiKey }}
				defaultCenter={{ lat: 59.95, lng: 30.33 }}
				defaultZoom={zoom}
			>
				<AnyReactComponent
					lat={center!.lat}
					lng={center!.lng}
					text="My Marker"
				/>
			</GoogleMapReact>
		</div>
	);
};

export default TestMap;

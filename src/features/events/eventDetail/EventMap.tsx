import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { apiKey } from "../../../app/API/googleApis";

interface MarkerProps {
	lat: number;
	lng: number;
}

const Marker: React.FC<MarkerProps> = () => {
	return <Icon name="map marker alternate" color="red" size="big" />;
};

interface EventMapProps {
	center: {
		lat: number;
		lng: number;
	};
	zoom?: number;
}

const EventMap: React.FC<EventMapProps> = ({ center, zoom = 11 }) => {
	return (
		<Segment attached="bottom" style={{ padding: 0 }}>
			<div style={{ height: 300, width: "100%" }}>
				<GoogleMapReact
					center={center}
					bootstrapURLKeys={{ key: apiKey }}
					defaultZoom={zoom}
				>
					<Marker lat={center.lat} lng={center.lng} />
				</GoogleMapReact>
			</div>
		</Segment>
	);
};

export default EventMap;

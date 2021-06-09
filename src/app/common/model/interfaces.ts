import firebase from "../../config/firebase";
export interface Attendee {
	id: string;
	name: string;
	photoURL: string;
}

export interface Place {
	address: string;
	latLng?: google.maps.LatLngLiteral;
}

export interface Event {
	id: string;
	title: string;
	date: Date;
	category: string;
	description: string;
	city: { address: string; latLng: { lat: number; lng: number } };
	venue: { address: string; latLng: { lat: number; lng: number } };
	hostedBy: string;
	hostPhotoURL: string;
	attendees: Attendee[];
	isCancelled: boolean;
}

export interface searchOptions {
	bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
	componentRestrictions?: google.maps.GeocoderComponentRestrictions;
	location?: google.maps.LatLng | google.maps.LatLngLiteral;
	offset?: number | string;
	radius?: number | string;
	sessionToken?: any;
	types?: string[];
}

export interface User {
	id: string;
	photos: CollectionRef[];
	displayName: string;
	description: string;
	email: string;
	createdAt: Date;
	photoURL: string;
}

export type CollectionRef =
	firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

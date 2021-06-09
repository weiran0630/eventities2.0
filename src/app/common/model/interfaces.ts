import firebase from "../../config/firebase";
export interface Attendee {
	id: string;
	displayName: string;
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
	hostUid: string;
	attendees: Attendee[];
	attendeesIds: string[];
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

export interface Comment {
	id: string;
	date: number;
	displayName: string;
	photoURL: string;
	text: string;
	uid: string;
}

export type DocRef =
	firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export type CollectionRef =
	firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

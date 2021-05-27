export interface Attendee {
	id: string;
	name: string;
	photoURL: string;
}

export interface Event {
	id: string;
	title: string;
	date: Date;
	category: string;
	description: string;
	city: string;
	venue: string;
	hostedBy: string;
	hostPhotoURL: string;
	attendees: Attendee[];
}

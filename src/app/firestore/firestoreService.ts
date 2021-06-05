import cuid from "cuid";
import { Event } from "../common/model/interfaces";
import firebase from "../config/firebase";

const db = firebase.firestore();

export const dataFromSnapshot = (
	snapshot: firebase.firestore.DocumentSnapshot
) => {
	if (!snapshot.exists) return undefined;

	const data = snapshot.data();

	for (const prop in data) {
		if (data.hasOwnProperty(prop)) {
			if (data[prop] instanceof firebase.firestore.Timestamp) {
				data[prop] = data[prop].toDate();
			}
		}
	}

	return { ...data, id: snapshot.id };
};

export const listenToEventsFromFirestore = () =>
	db.collection("events").orderBy("date");

export const listenToIndividualEventFromFirestore = (id: string) =>
	db.collection("events").doc(id);

export const addEventToFirestore = (event: Event) =>
	db.collection("events").add({
		...event,
		hostedBy: "Diana",
		hostPhotoURL: "https://randomuser.me/api/portraits/women/1.jpg",
		attendees: firebase.firestore.FieldValue.arrayUnion({
			id: cuid(),
			displayName: "Diana",
			photoURL: "https://randomuser.me/api/portraits/women/1.jpg",
		}),
	});

export const updateEventToFirestore = (event: Event) =>
	db.collection("events").doc(event.id).update(event);

export const deleteEventFromFirestore = (event: Event) =>
	db.collection("events").doc(event.id).delete();

export const cancelEventToggle = (event: Event) =>
	db.collection("events").doc(event.id).update({
		isCancelled: !event.isCancelled,
	});

export const setUserProfileData = (user: firebase.User) => {
	return db.collection("user").doc(user.uid).set({
		displayName: user.displayName,
		email: user.email,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	});
};

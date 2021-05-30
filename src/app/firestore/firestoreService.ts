import { dateToString } from "../common/util";
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
				data[prop] = dateToString(data[prop].toDate());
			}
		}
	}
	return {
		...data,
		id: snapshot.id,
	};
};

export const getEventsFromFirestore = (observer: {
	next?: (snapshot: firebase.firestore.QuerySnapshot) => void;
	error?: (error: Error) => void;
	complete?: () => void;
}) => db.collection("events").onSnapshot(observer);

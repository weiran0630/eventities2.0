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
	db.collection("events").orderBy("date"); // events is sorted by date

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
	return db
		.collection("user")
		.doc(user.uid)
		.set({
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL || null,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
};

export const getUserProfile = (userId: string) => {
	return db.collection("user").doc(userId);
};

export const updateUserProfile = async (profile: any) => {
	const user = firebase.auth().currentUser;

	try {
		if (user?.displayName !== profile.displayName) {
			await user?.updateProfile({
				displayName: profile.displayName,
			});
		}

		return await db.collection("user").doc(user?.uid).update(profile);
	} catch (error) {
		throw error;
	}
};

export const updateUserProfilePhoto = async (
	downloadURL: string,
	filename: string
) => {
	const user = firebase.auth().currentUser;
	const userDocRef = db.collection("user").doc(user?.uid);
	try {
		const userDoc = await userDocRef.get();

		if (!userDoc.data()?.photoURL) {
			await db
				.collection("user")
				.doc(user?.uid)
				.update({ photoURL: downloadURL }); // update the photoURL if there isn't one exist

			await user?.updateProfile({
				photoURL: downloadURL, // also update the user profile photoURL
			});
		}

		return await db.collection("user").doc(user?.uid).collection("photos").add({
			name: filename,
			url: downloadURL,
		});
	} catch (error) {
		throw error;
	}
};

export const getUserPhotos = (userUid: string) => {
	return db.collection("user").doc(userUid).collection("photos");
};

export const setMainPhoto = async (photo: any) => {
	const user = firebase.auth().currentUser;

	try {
		await db.collection("user").doc(user?.uid).update({ photoURL: photo.url });
		return await user?.updateProfile({ photoURL: photo.url });
	} catch (error) {
		throw error;
	}
};

export const deletePhotoFromCollection = (photoId: string) => {
	const user = firebase.auth().currentUser;

	return db
		.collection("user")
		.doc(user?.uid)
		.collection("photos")
		.doc(photoId)
		.delete();
};

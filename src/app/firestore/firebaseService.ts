import { setUserProfileData } from "./firestoreService";
import firebase, { firebaseRTDatabaseURL } from "../config/firebase";
import { toast } from "react-toastify";

export const firebaseObjectToArray = (snapshot: any) => {
	if (snapshot)
		return Object.entries(snapshot).map(
			(s) => Object.assign({}, s[1], { id: s[0] }) // Populate e[0] as id and e[1] as properties into a new empty object
		);
};

export const signInWithEmail = (creds: { email: string; password: string }) =>
	firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);

export const signOut = () => firebase.auth().signOut();

export const registerInFirebase = async (creds: {
	displayName: string;
	email: string;
	password: string;
}) => {
	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(creds.email, creds.password);

		await result.user?.updateProfile({ displayName: creds.displayName });

		return await setUserProfileData(result.user!);
	} catch (error) {
		throw error;
	}
};

export const socialLogin = async (selectedProvider: string) => {
	const provider = new firebase.auth.GoogleAuthProvider();

	try {
		const result = await firebase
			.auth()
			.signInWithPopup(provider as firebase.auth.GoogleAuthProvider);

		if (result.additionalUserInfo?.isNewUser) {
			await setUserProfileData(result.user!);
		}
	} catch (error) {
		toast.error(error.message);
	}
};

export const updateUserPassword = (creds: {
	newPassword1: string;
	newPassword2: string;
}) => {
	const user = firebase.auth().currentUser;

	return user?.updatePassword(creds.newPassword1);
};

export const uploadToFirebaseStorage = (file: Blob, filename: string) => {
	const user = firebase.auth().currentUser;
	const storageRef = firebase.storage().ref();

	return storageRef.child(`${user?.uid}/user_images/${filename}`).put(file);
};

export const deleteFromFirebaseStorage = (filename: string) => {
	const user = firebase.auth().currentUser;
	const storageRef = firebase.storage().ref();
	const photoRef = storageRef.child(`${user?.uid}/user_images/${filename}`);

	return photoRef.delete();
};

export const addEventChatComment = (eventId: string, comment: string) => {
	const user = firebase.auth().currentUser;
	const newComment = {
		displayName: user?.displayName,
		photoURL: user?.photoURL,
		uid: user?.uid,
		text: comment,
		date: Date.now(),
	};

	/** firebase.database access firebase realtime database instead */
	return firebase
		.app()
		.database(firebaseRTDatabaseURL)
		.ref(`chat/${eventId}`)
		.push(newComment);
};

export const getEventChatRef = (eventId?: string) =>
	firebase
		.app()
		.database(firebaseRTDatabaseURL)
		.ref(`chat/${eventId}`)
		.orderByKey(); // key is effectively a timestamp: sort with time in descending order

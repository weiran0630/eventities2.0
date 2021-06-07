import { setUserProfileData } from "./firestoreService";
import firebase from "../config/firebase";
import { toast } from "react-toastify";

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

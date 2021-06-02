import { dataFromSnapshot } from "../firestore/firestoreService";
import { useEffect } from "react";
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart,
} from "../store/slice/asyncSlice";
import { useTypedDispatch } from "../store/hooks/index";
import firebase from "../config/firebase";

interface config {
	query: () => firebase.firestore.Query<firebase.firestore.DocumentData>;
	data: any;
	dependencies: any;
}

const useFirestoreCollection = ({ query, data, dependencies }: config) => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(asyncActionStart());
		const unsubscribe = query().onSnapshot(
			(snapshot) => {
				const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
				data(docs);
				dispatch(asyncActionFinish());
			},
			(error) => dispatch(asyncActionError(error))
		);
		return () => unsubscribe();
	}, dependencies); //eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreCollection;

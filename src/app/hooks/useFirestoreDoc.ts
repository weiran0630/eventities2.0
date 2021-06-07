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
	query: () => firebase.firestore.DocumentReference;
	data: any;
	dependencies: any;
	shouldExecute?: boolean;
}

/** custom useEffect hooks to query firestore document */
const useFirestoreDoc = ({
	query,
	data,
	dependencies,
	shouldExecute = true,
}: config) => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (!shouldExecute) return;

		dispatch(asyncActionStart());

		const unsubscribe = query().onSnapshot(
			(snapshot) => {
				if (!snapshot.exists) {
					dispatch(
						asyncActionError({
							code: "not-found",
							message: "Could not find document",
						})
					);
					return;
				}

				data(dataFromSnapshot(snapshot));

				dispatch(asyncActionFinish());
			},
			(error) => dispatch(asyncActionError(error))
		);
		return () => unsubscribe();
	}, dependencies); //eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreDoc;

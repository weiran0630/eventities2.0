import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";

import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { listenToEvent } from "../../../app/store/slice/eventSlice";
import { categoryOptions } from "../../../app/common/model/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlacesInput from "../../../app/common/form/MyPlacesInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/common/loadingComponent";
import {
	addEventToFirestore,
	cancelEventToggle,
	listenToIndividualEventFromFirestore,
	updateEventToFirestore,
} from "../../../app/firestore/firestoreService";

interface ParamTypes {
	id: string;
}

const EventForm: React.FC = () => {
	const { id } = useParams<ParamTypes>();
	const history = useHistory();

	const dispatch = useTypedDispatch();
	const selectedEvent = useTypedSelector((state) =>
		state.event.events.find((e) => e.id === id)
	);
	const { loading, error } = useTypedSelector((state) => state.async);

	useFirestoreDoc({
		query: () => listenToIndividualEventFromFirestore(id),
		data: (event: Event) => dispatch(listenToEvent([event])),
		shouldExecute: !!id,
		dependencies: [id, dispatch],
	});

	const [loadingCancel, setLoadingCancel] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);

	const handleCancelToggle = async (event: typeof selectedEvent) => {
		setConfirmModalOpen(false);
		setLoadingCancel(true);
		try {
			await cancelEventToggle(event!);
			setLoadingCancel(false);
		} catch (error) {
			setLoadingCancel(true);
			toast.error(error.message);
		}
	};

	const initialValues = {
		title: "",
		category: "",
		date: new Date(),
		description: "",
		city: {
			address: "",
			latLng: { lat: 0, lng: 0 },
		},
		venue: {
			address: "",
			latLng: { lat: 0, lng: 0 },
		},
		isCancelled: false,
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("???????????????????????????????????????"),
		category: Yup.string().required("?????????????????????"),
		description: Yup.string().required("???????????????????????????????????????"),
		date: Yup.string().required("?????????????????????"),
		city: Yup.object().shape({
			address: Yup.string().required("?????????????????????"),
		}),
		venue: Yup.object().shape({
			address: Yup.string().required("???????????????????????????"),
		}),
	});

	if (loading) return <LoadingComponent content="?????????" />;

	if (error) return <Redirect to="/error" />;

	return (
		<Segment clearing>
			<Formik
				initialValues={selectedEvent ? selectedEvent : initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventToFirestore({ ...selectedEvent, ...values })
							: await addEventToFirestore(values);
						setSubmitting(false);
						history.push(`/events`);
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
				}}>
				{({ isSubmitting, dirty, isValid, values, initialValues }) => (
					<Form className="ui form">
						<Header
							sub
							content={selectedEvent ? "????????????" : "???????????????"}
							color="teal"
							style={{ marginBottom: "1em" }}
						/>

						<MyTextInput label="??????" name="title" placeholder="??????" />

						<MyDateInput
							label="??????"
							name="date"
							type="date"
							placeholderText="??????"
							timeFormat="HH:mm"
							dateFormat="MMMM d, yyyy h:mm a"
							onChange={() => {
								return;
							}}
						/>

						<MySelectInput
							label="??????"
							name="category"
							placeholder="??????"
							options={categoryOptions}
						/>

						<MyTextArea label="??????" name="description" placeholder="??????" />

						<Header
							sub
							content="????????????"
							color="teal"
							style={{ marginBottom: "1em" }}
						/>

						<MyPlacesInput label="??????" name="city" placeholder="??????/??????" />

						<MyPlacesInput
							disabled={!values.city.latLng}
							label="????????????"
							name="venue"
							placeholder="????????????"
							options={{
								location: new google.maps.LatLng(values.city.latLng),
								radius: 1000,
								types: ["establishment"],
							}}
						/>

						{selectedEvent && (
							<Button
								loading={loadingCancel}
								type="button"
								floated="left"
								color={selectedEvent.isCancelled ? "green" : "red"}
								content={
									selectedEvent.isCancelled ? "??????????????????" : "????????????"
								}
								onClick={() => setConfirmModalOpen(true)}
							/>
						)}

						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							floated="right"
							positive
							content="??????"
						/>

						<Button
							disabled={isSubmitting}
							as={Link}
							to={id ? `/events/${id}` : "/events"}
							type="submit"
							floated="right"
							content="??????"
						/>
					</Form>
				)}
			</Formik>
			<Confirm
				content={
					selectedEvent?.isCancelled
						? "????????????????????????????????????????????????"
						: "??????????????????????????????????????????"
				}
				open={confirmModalOpen}
				onCancel={() => setConfirmModalOpen(false)}
				onConfirm={async () => {
					await handleCancelToggle(selectedEvent);
				}}
			/>
		</Segment>
	);
};

export default EventForm;

import React, { useState } from "react";
import cuid from "cuid";
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
	listenToEventFromFirestore,
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
		query: () => listenToEventFromFirestore(id),
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
		title: Yup.string().required("活動標題爲必填，請重新確認"),
		category: Yup.string().required("請選擇活動種類"),
		description: Yup.string().required("活動描述爲必填，請確認輸入"),
		date: Yup.string().required("請輸入活動日期"),
		city: Yup.object().shape({
			address: Yup.string().required("請輸入城市欄位"),
		}),
		venue: Yup.object().shape({
			address: Yup.string().required("請輸入場地地址欄位"),
		}),
	});

	if (loading) return <LoadingComponent content="載入中" />;

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
							: await addEventToFirestore({
									...values,
									id: cuid(),
									hostedBy: "Bob",
									hostPhotoURL: "/assets/user.png",
									attendees: [],
							  });
						setSubmitting(false);
						history.push(`/events`);
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values, initialValues }) => (
					<Form className="ui form">
						<Header
							sub
							content={selectedEvent ? "修改活動" : "舉辦新活動"}
							color="teal"
							style={{ marginBottom: "1em" }}
						/>

						<MyTextInput label="標題" name="title" placeholder="標題" />

						<MyDateInput
							label="日期"
							name="date"
							type="date"
							placeholderText="日期"
							timeFormat="HH:mm"
							dateFormat="MMMM d, yyyy h:mm a"
							onChange={() => {
								return;
							}}
						/>

						<MySelectInput
							label="種類"
							name="category"
							placeholder="種類"
							options={categoryOptions}
						/>

						<MyTextArea label="描述" name="description" placeholder="描述" />

						<Header
							sub
							content="活動地點"
							color="teal"
							style={{ marginBottom: "1em" }}
						/>

						<MyPlacesInput label="縣市" name="city" placeholder="地區/縣市" />

						<MyPlacesInput
							disabled={!values.city.latLng}
							label="場地地址"
							name="venue"
							placeholder="場地地址"
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
									selectedEvent.isCancelled ? "重新啓動活動" : "暫停活動"
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
							content="提交"
						/>

						<Button
							disabled={isSubmitting}
							as={Link}
							to={id ? `/events/${id}` : "/events"}
							type="submit"
							floated="right"
							content="返回"
						/>
					</Form>
				)}
			</Formik>
			<Confirm
				content={
					selectedEvent?.isCancelled
						? "這會重新啓動您的活動，是否確定？"
						: "這會取消您的活動，是否確定？"
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

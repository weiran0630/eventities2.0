import React from "react";
import cuid from "cuid";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";

import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { listenToEvent } from "../../../app/store/slice/eventSlice";
import { categoryOptions } from "../../../app/common/model/categoryOptions";
import {
	addEventToFirestore,
	listenToEventFromFirestore,
	updateEventToFirestore,
} from "../../../app/firestore/firestoreService";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlacesInput from "../../../app/common/form/MyPlacesInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/common/loadingComponent";
import { toast } from "react-toastify";

interface ParamTypes {
	id: string;
}

const EventForm: React.FC = () => {
	const { id } = useParams<ParamTypes>();
	const history = useHistory();

	const selectedEvent = useTypedSelector(({ event }) =>
		event.events.find((e) => e.id === id)
	);
	const dispatch = useTypedDispatch();

	const { loading, error } = useTypedSelector((state) => state.async);

	useFirestoreDoc({
		query: () => listenToEventFromFirestore(id),
		data: (event: Event) => dispatch(listenToEvent([event])),
		dependencies: [id, dispatch],
		shouldExecute: !!id, // cast id into boolean, if exist => true
	});

	const initialValues = selectedEvent ?? {
		title: "",
		category: "",
		date: new Date(),
		description: "",
		city: {
			address: "",
			latLng: {
				lat: null as unknown as number,
				lng: null as unknown as number,
			},
		},
		venue: {
			address: "",
			latLng: {
				lat: null as unknown as number,
				lng: null as unknown as number,
			},
		},
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
				initialValues={initialValues}
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
									date: new Date(),
							  });
						setSubmitting(false);
						history.push(`/events`);
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
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
							to="/events"
							type="submit"
							floated="right"
							content="取消"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
};

export default EventForm;

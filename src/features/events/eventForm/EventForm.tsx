import React from "react";
import cuid from "cuid";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";

import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { createEvent, updateEvent } from "../../../app/store/slice/eventSlice";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/model/categoryOptions";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";

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

	const initialValues = selectedEvent ?? {
		title: "",
		category: "",
		date: new Date(),
		description: "",
		city: "",
		venue: "",
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("活動標題爲必填，請重新確認"),
		category: Yup.string().required("請選擇活動種類"),
		description: Yup.string().required("活動描述爲必填，請確認輸入"),
		date: Yup.string().required("請輸入活動日期"),
		city: Yup.string().required("請輸入城市欄位"),
		venue: Yup.string().required("請輸入場地欄位"),
	});

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values })) // only changes the props matches values
						: dispatch(
								createEvent({
									...values,
									id: cuid(),
									hostedBy: "Bob",
									hostPhotoURL: "/assets/user.png",
									attendees: [],
									date: new Date(),
								})
						  );
					history.push(`/events`);
				}}
			>
				{({ isSubmitting, dirty, isValid }) => (
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
						></MyDateInput>

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
						<MyTextInput label="縣市" name="city" placeholder="縣市" />

						<MyTextInput label="場地" name="venue" placeholder="場地" />

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

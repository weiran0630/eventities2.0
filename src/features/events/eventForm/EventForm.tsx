import cuid from "cuid";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Event } from "../../../app/model/interfaces";

interface EventFormProp {
	selectedEvent: Event | undefined;
	createEvent: (event: Event) => void;
	updateEvent: (event: Event) => void;
	setFormVisible: (value: boolean) => void;
}

const EventForm: React.FC<EventFormProp> = ({
	selectedEvent,
	createEvent,
	updateEvent,
	setFormVisible,
}) => {
	const initialValue = selectedEvent ?? {
		title: "",
		category: "",
		date: "",
		description: "",
		city: "",
		venue: "",
	};

	const [values, setValues] = useState(initialValue);

	const handleFormSubmit = () => {
		selectedEvent
			? updateEvent({ ...selectedEvent, ...values }) // only changes the props matches values
			: createEvent({
					...values,
					id: cuid(),
					hostedBy: "Bob",
					hostPhotoURL: "/assets/user.png",
					attendees: [],
			  });
		setFormVisible(false);
	};

	const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	return (
		<Segment clearing>
			<Header content={selectedEvent ? "修改活動" : "舉辦新活動"} />
			<Form onSubmit={handleFormSubmit}>
				<Form.Input
					placeholder="標題"
					type="text"
					name="title"
					value={values.title}
					onChange={(e) => handleInputChanges(e)}
				/>
				<Form.Input
					placeholder="描述"
					type="text"
					name="description"
					value={values.description}
					onChange={(e) => handleInputChanges(e)}
				/>
				<Form.Input
					placeholder="種類"
					type="text"
					name="category"
					value={values.category}
					onChange={(e) => handleInputChanges(e)}
				/>
				<Form.Input
					placeholder="日期"
					type="date"
					name="date"
					value={values.date}
					onChange={(e) => handleInputChanges(e)}
				/>
				<Form.Input
					placeholder="城市"
					type="text"
					name="city"
					value={values.city}
					onChange={(e) => handleInputChanges(e)}
				/>
				<Form.Input
					placeholder="場地"
					type="text"
					name="venue"
					value={values.venue}
					onChange={(e) => handleInputChanges(e)}
				/>
				<Button type="submit" floated="right" positive content="提交" />
				<Button
					as={Link}
					to="/events"
					type="submit"
					floated="right"
					content="取消"
				/>
			</Form>
		</Segment>
	);
};

export default EventForm;

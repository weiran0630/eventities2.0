import React from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

interface EventFormProp {
	handleFormVisible: () => void;
}

const EventForm: React.FC<EventFormProp> = ({ handleFormVisible }) => {
	return (
		<Segment clearing>
			<Header content="舉辦新活動" />
			<Form>
				<Form.Input placeholder="標題" name="title" type="text" />
				<Form.Input placeholder="描述" name="description" type="text" />
				<Form.Input placeholder="種類" name="category" type="text" />
				<Form.Input placeholder="日期" name="date" type="date" />
				<Form.Input placeholder="城市" name="city" type="text" />
				<Form.Input placeholder="場地" name="venue" type="text" />
				<Button type="submit" floated="right" positive content="提交" />
				<Button
					onClick={handleFormVisible}
					type="submit"
					floated="right"
					content="取消"
				/>
			</Form>
		</Segment>
	);
};

export default EventForm;

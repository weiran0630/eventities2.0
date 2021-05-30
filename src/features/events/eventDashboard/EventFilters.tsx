import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const EventFilters: React.FC = () => {
	return (
		<>
			<Menu vertical size="large" style={{ width: "100%" }}>
				<Header icon="filter" attached color="teal" content="篩選活動" />
				<Menu.Item content="所有活動" />
				<Menu.Item content="已報名的活動" />
				<Menu.Item content="您舉辦的活動" />
			</Menu>
			<Header icon="calendar" attached color="teal" content="選擇日期" />
			<Calendar />
		</>
	);
};

export default EventFilters;

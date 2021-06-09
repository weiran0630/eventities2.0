import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";
import { predicateType } from "./EventDashboard";

interface EventFiltersProps {
	loading: boolean;
	predicate: Map<string, predicateType>;
	handleSetPredicate: (key: string, value: predicateType) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
	loading,
	predicate,
	handleSetPredicate,
}) => {
	return (
		<>
			<Menu vertical size="large" style={{ width: "100%" }}>
				<Header icon="filter" attached color="teal" content="篩選活動" />
				<Menu.Item
					content="所有活動"
					disabled={loading}
					active={predicate.get("filter") === "all"}
					onClick={() => handleSetPredicate("filter", "all")}
				/>
				<Menu.Item
					content="已報名的活動"
					disabled={loading}
					active={predicate.get("filter") === "attended"}
					onClick={() => handleSetPredicate("filter", "attended")}
				/>
				<Menu.Item
					content="您主持的活動"
					disabled={loading}
					active={predicate.get("filter") === "hosting"}
					onClick={() => handleSetPredicate("filter", "hosting")}
				/>
			</Menu>
			<Header icon="calendar" attached color="teal" content="選擇日期" />
			<Calendar
				tileDisabled={() => loading}
				onChange={(date) => handleSetPredicate("startDate", date)}
				value={(predicate.get("startDate") as Date) || new Date()}
			/>
		</>
	);
};

export default EventFilters;

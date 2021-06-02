import React from "react";
import { useFormikContext, FieldHookConfig, useField } from "formik";
import { FormField } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

type MyDateInputProps = { label: string } & FieldHookConfig<string> &
	ReactDatePickerProps;

const MyDateInput: React.FC<MyDateInputProps> = ({ label, ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(props);

	return (
		<FormField error={meta.touched && !!meta.error}>
			<DatePicker
				{...field}
				placeholderText={props.placeholder}
				timeCaption="時間"
				showTimeSelect
				dateFormat={props.dateFormat}
				timeFormat={props.timeFormat}
				selected={(field.value && new Date(field.value)) || null}
				onChange={(value) => setFieldValue(field.name, value)}
			/>
			{meta.touched && meta.error ? (
				<p style={{ color: "red", marginLeft: "0.1em" }}>{meta.error}</p>
			) : null}
		</FormField>
	);
};

export default MyDateInput;

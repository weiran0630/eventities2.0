import React from "react";
import { useField, FieldHookConfig } from "formik";
import { FormField } from "semantic-ui-react";

type MyTextAreaProps = { label: string } & FieldHookConfig<string>;

const MyTextArea: React.FC<MyTextAreaProps> = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<FormField error={meta.touched && !!meta.error}>
			<textarea {...field} placeholder={props.placeholder} />
			{meta.touched && meta.error ? (
				<p style={{ color: "red", marginLeft: "0.1em" }}>{meta.error}</p>
			) : null}
		</FormField>
	);
};

export default MyTextArea;

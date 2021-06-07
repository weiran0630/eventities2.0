import React from "react";
import { useField, FieldHookConfig } from "formik";
import { FormField } from "semantic-ui-react";

type MyTextInputProps = { label: string } & FieldHookConfig<string>;

const MyTextInput: React.FC<MyTextInputProps> = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<FormField error={meta.touched && !!meta.error}>
			<input {...field} placeholder={props.placeholder} type={props.type} />

			{meta.touched && meta.error ? (
				<p style={{ color: "red", marginLeft: "0.1em" }}>{meta.error}</p>
			) : null}
		</FormField>
	);
};

export default MyTextInput;

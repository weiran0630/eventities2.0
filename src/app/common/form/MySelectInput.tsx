import React from "react";
import { useField, FieldHookConfig } from "formik";
import { FormField, Select, SelectProps } from "semantic-ui-react";

type MySelectInputProps = { label: string } & FieldHookConfig<string> &
	SelectProps;

const MySelectInput: React.FC<MySelectInputProps> = ({ label, ...props }) => {
	const [field, meta, helpers] = useField(props);
	return (
		<FormField error={meta.touched && !!meta.error}>
			<Select
				clearable
				value={field.value || null}
				onChange={(e, dropDownProps) =>
					helpers.setValue(dropDownProps.value as string)
				}
				onBlur={() => helpers.setTouched(true)}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<p style={{ color: "red", marginLeft: "0.1em" }}>{meta.error}</p>
			) : null}
		</FormField>
	);
};

export default MySelectInput;

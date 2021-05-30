import React, { FocusEvent } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { useField, FieldHookConfig } from "formik";
import { FormField, List, Segment } from "semantic-ui-react";

import { Place, searchOptions } from "../model/interfaces";

type MyPlacesInputProps = {
	label: string;
	options?: searchOptions;
} & FieldHookConfig<Place>;

const MyPlacesInput: React.FC<MyPlacesInputProps> = ({
	label,
	options,
	...props
}) => {
	const [field, meta, helpers] = useField(props);

	const handleSelect = async (address: string) => {
		const latLng = await getLatLng((await geocodeByAddress(address))[0]);
		try {
			helpers.setValue({ address, latLng });
		} catch (error) {
			helpers.setError(error);
		}
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		field.onBlur(e);
		if (!field.value.latLng)
			helpers.setValue({ address: "", latLng: undefined });
	};

	return (
		<PlacesAutocomplete
			value={field.value.address}
			onChange={(value) => helpers.setValue({ address: value })}
			onSelect={(value) => handleSelect(value)}
			searchOptions={{ ...options }}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<FormField error={meta.touched && !!meta.error}>
					<input
						value={field.value}
						placeholder={props.placeholder}
						{...getInputProps({
							name: field.name,
							onBlur: (e) => handleBlur(e),
						})}
					/>
					{meta.touched && meta.error ? (
						<p style={{ color: "red", marginLeft: "0.1em" }}>此欄位不能爲空</p>
					) : null}

					{suggestions?.length > 0 && (
						<Segment
							loading={loading}
							style={{
								marginTop: 0,
								position: "absolute",
								zIndex: 20,
								width: "100%",
							}}
						>
							<List selection>
								{suggestions.map((suggestion) => (
									<List.Item
										{...{
											...getSuggestionItemProps(suggestion),
											key: suggestion.placeId,
										}}
									>
										<List.Header>
											{suggestion.formattedSuggestion.mainText}
										</List.Header>
										<List.Description>
											{suggestion.formattedSuggestion.secondaryText}
										</List.Description>
									</List.Item>
								))}
							</List>
						</Segment>
					)}
				</FormField>
			)}
		</PlacesAutocomplete>
	);
};

export default MyPlacesInput;

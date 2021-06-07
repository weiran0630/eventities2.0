import React, { useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

interface TestPlacesInputProps {
	setLatLng: (center: { lat: number; lng: number }) => void;
}

const TestPlacesInput: React.FC<TestPlacesInputProps> = ({ setLatLng }) => {
	const [address, setAddress] = useState<string>("");

	const handleChange = (address: string) => {
		setAddress(address);
	};

	const handleSelect = async (address: string) => {
		const results = await geocodeByAddress(address);
		const latLng = await getLatLng(results[0]);

		try {
			console.log("Success", latLng);
			setLatLng(latLng);
		} catch (error) {
			console.error("Error", error);
		}
		setAddress(address);
	};

	return (
		<PlacesAutocomplete
			value={address}
			onChange={handleChange}
			onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div>
					<input
						{...getInputProps({
							placeholder: "Search Places ...",
							className: "location-search-input",
						})}
					/>

					<div className="autocomplete-dropdown-container">
						{loading && <div>Loading...</div>}
						{suggestions.map((suggestion) => {
							const className = suggestion.active
								? "suggestion-item--active"
								: "suggestion-item";

							// inline style for demonstration purpose
							const style = suggestion.active
								? { backgroundColor: "#fafafa", cursor: "pointer" }
								: { backgroundColor: "#ffffff", cursor: "pointer" };

							return (
								<div
									{...getSuggestionItemProps(suggestion, {
										className,
										style,
									})}
									key={suggestion.placeId}
								>
									<span>{suggestion.description}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	);
};

export default TestPlacesInput;

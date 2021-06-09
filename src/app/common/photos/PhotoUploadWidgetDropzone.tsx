import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { imageFile } from "./PhotoUploadWidget";

/** change border-color according to the Container props */
const getColor = (props: any) => {
	if (props.isDragAccept) {
		return "#00e676";
	}
	if (props.isDragReject) {
		return "#ff1744";
	}
	if (props.isDragActive) {
		return "#2196f3";
	}
	return "#eeeeee";
};

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 200px;
	width: 200px;
	padding: 20px;
	border-width: 2px;
	border-radius: 5%;
	border-color: ${(props) => getColor(props)};
	border-style: dashed;
	margin-top: 20px;
	background-color: #fafafa;
	color: #bdbdbd;
	outline: none;
	transition: border 0.24s ease-in-out;
`;

interface PhotoUploadWidgetDropzoneProps {
	setFiles: (files: imageFile[]) => void;
}

const PhotoUploadWidgetDropzone: React.FC<PhotoUploadWidgetDropzoneProps> = ({
	setFiles,
}) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file), // assign a preview url to the file object
					})
				)
			);
		},
		[setFiles]
	);
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: "image/*",
	}); // obtain DropzoneState

	return (
		<Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
			<input {...getInputProps()} />
			<Icon name="plus" size="huge" />
			<Header style={{ color: "#bdbdbd" }}>拖放您的照片到此</Header>
		</Container>
	);
};

export default PhotoUploadWidgetDropzone;

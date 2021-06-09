import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface PhotoUploadWidgetCropperProps {
	src?: string;
	setImage: (blob: Blob) => void;
}

const PhotoUploadWidgetCropper: React.FC<PhotoUploadWidgetCropperProps> = ({
	src,
	setImage,
}) => {
	const cropperRef = useRef<HTMLImageElement>(null);
	const onCrop = () => {
		const imageElement: any = cropperRef?.current;
		const cropper: any = imageElement?.cropper;
		console.log(
			cropper.getCroppedCanvas().toBlob((blob: Blob) => {
				setImage(blob);
			}, "image/jpg")
		);
	};

	return (
		<Cropper
			src={src}
			ref={cropperRef}
			style={{ height: 200, width: 200, marginTop: 20 }}
			// Cropper.js options
			initialAspectRatio={1} // 1 / 1 square image
			preview=".img-preview" // class name of the preview image div
			guides={false}
			viewMode={1}
			dragMode="move"
			scalable
			cropBoxMovable
			cropBoxResizable
			crop={onCrop}
		/>
	);
};

export default PhotoUploadWidgetCropper;

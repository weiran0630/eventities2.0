import cuid from "cuid";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Grid, Header } from "semantic-ui-react";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";
import { getFileExtension } from "../util";
import PhotoUploadWidgetCropper from "./PhotoUploadWidgetCropper";
import PhotoUploadWidgetDropzone from "./PhotoUploadWidgetDropzone";

export type imageFile = File & { preview: string };

interface PhotoUploadWidgetProps {
	setEditMode: (value: boolean) => void;
}

const PhotoUploadWidget: React.FC<PhotoUploadWidgetProps> = ({
	setEditMode,
}) => {
	const [files, setFiles] = useState<imageFile[]>([]);
	const [image, setImage] = useState<Blob | null>(null);
	const [loading, setLoading] = useState(false);

	const handleUploadImage = () => {
		setLoading(true);
		const filename = `${cuid()}.${getFileExtension(files[0].name)}`;
		const uploadTask = uploadToFirebaseStorage(image!, filename);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				/** do nothing with the snapshot */
			},
			(error) => toast.error(error.message), // if we get an error
			async () => {
				/** after uploadTask is finished (callback) */
				const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

				try {
					await updateUserProfilePhoto(downloadURL, filename);
					handleCancelCrop();
					setEditMode(false);
				} catch (error) {
					toast.error(error.message);
				} finally {
					setLoading(false);
				}
			}
		);
	};

	const handleCancelCrop = () => {
		setFiles([]);
		setImage(null);
	};

	return (
		<Grid>
			<Grid.Column width={4}>
				<Header color="teal" sub content="第一步 - 新增照片" />
				<PhotoUploadWidgetDropzone setFiles={setFiles} />
			</Grid.Column>

			<Grid.Column width={1} />
			<Grid.Column width={4}>
				<Header color="teal" sub content="第二步 - 調整大小" />
				{files.length > 0 && (
					<PhotoUploadWidgetCropper
						src={files[0].preview}
						setImage={setImage}
					/>
				)}
			</Grid.Column>

			<Grid.Column width={1} />
			<Grid.Column width={4}>
				<Header color="teal" sub content="第三步 - 預覽並上傳" />
				{files.length > 0 && (
					<>
						<div
							className="img-preview"
							style={{
								minHeight: 200,
								minWidth: 200,
								marginTop: 20,
								overflow: "hidden",
							}}
						/>

						<Button.Group style={{ width: "200px" }}>
							<Button
								loading={loading}
								basic
								color="green"
								icon="check"
								onClick={handleUploadImage}
							/>
							<Button
								disabled={loading}
								basic
								color="red"
								icon="close"
								onClick={handleCancelCrop}
							/>
						</Button.Group>
					</>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default PhotoUploadWidget;

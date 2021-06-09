import React, { useState } from "react";
import {
	Button,
	Card,
	Grid,
	Header,
	Icon,
	Tab,
	Image,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import {
	deletePhotoFromCollection,
	getUserPhotos,
	setMainPhoto,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { listenToUserPhotos } from "../../../app/store/slice/profileSlice";
import { CollectionRef } from "../../../app/common/model/interfaces";
import { toast } from "react-toastify";
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";

interface AboutTabProps {
	profile: {
		id: string;
		displayName: string;
		description: string;
		createdAt: Date;
		photoURL: string;
	};
	isCurrentUser: boolean;
}

const AboutTab: React.FC<AboutTabProps> = ({ profile, isCurrentUser }) => {
	const [editMode, setEditMode] = useState(false);
	const dispatch = useTypedDispatch();
	const { loading } = useTypedSelector((state) => state.async);
	const { photos } = useTypedSelector((state) => state.profile);
	const [updating, setUpdating] = useState({
		isUpdating: false,
		target: null as string | null,
	});
	const [deleting, setDeleting] = useState({
		isDeleting: false,
		target: null as string | null,
	});

	const handleSetMainPhoto = async (photo: any, target: string) => {
		setUpdating({ isUpdating: true, target: target });
		try {
			await setMainPhoto(photo);
		} catch (error) {
			toast.error(error);
		} finally {
			setUpdating({ isUpdating: false, target: null });
		}
	};

	const handlePhotoDelete = async (photo: any, target: string) => {
		setDeleting({ isDeleting: true, target: target });
		try {
			await deleteFromFirebaseStorage(photo.name);
			await deletePhotoFromCollection(photo.id);
		} catch (error) {
			toast.error(error);
		} finally {
			setDeleting({ isDeleting: false, target: null });
		}
	};

	useFirestoreCollection({
		query: () => getUserPhotos(profile.id),
		data: (photos: CollectionRef[]) => dispatch(listenToUserPhotos(photos)),
		dependencies: [dispatch, profile.id],
	});

	return (
		<Tab.Pane loading={loading}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated="left">
						<Icon name="user" color="teal" />
						照片
					</Header>

					{isCurrentUser && (
						<Button
							basic={editMode}
							color={editMode ? "red" : "green"}
							floated="right"
							onClick={() => setEditMode(!editMode)}
							content={editMode ? "取消" : "新增照片"}
						/>
					)}
				</Grid.Column>

				<Grid.Column width={16}>
					{editMode ? (
						<PhotoUploadWidget setEditMode={setEditMode} />
					) : (
						<Card.Group itemsPerRow={5}>
							{photos.map((photo: any) => (
								<Card key={photo.id}>
									<Image src={photo.url} />

									<Button.Group fluid width={5}>
										<Button
											basic
											name={photo.id}
											disabled={photo.url === profile.photoURL}
											loading={
												updating.isUpdating && updating.target === photo.id
											}
											color="green"
											content="主要"
											onClick={async (e) => {
												handleSetMainPhoto(photo, e.currentTarget.name);
											}}
										/>
										<Button
											basic
											name={photo.id}
											disabled={photo.url === profile.photoURL}
											loading={
												deleting.isDeleting && deleting.target === photo.id
											}
											onClick={async (e) => {
												handlePhotoDelete(photo, e.currentTarget.name);
											}}
											color="red"
											icon="trash"
										/>
									</Button.Group>
								</Card>
							))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default AboutTab;

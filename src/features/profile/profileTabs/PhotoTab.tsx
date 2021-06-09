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
import { getUserPhotos } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { useTypedDispatch, useTypedSelector } from "../../../app/store/hooks";
import { listenToUserPhotos } from "../../../app/store/slice/profileSlice";
import { CollectionRef } from "../../../app/common/model/interfaces";

interface AboutTabProps {
	profile: {
		id: string;
		displayName: string;
		description: string;
		createdAt: Date;
	};
	isCurrentUser: boolean;
}

const AboutTab: React.FC<AboutTabProps> = ({ profile, isCurrentUser }) => {
	const [editMode, setEditMode] = useState(false);
	const dispatch = useTypedDispatch();
	const { loading } = useTypedSelector((state) => state.async);
	const { photos } = useTypedSelector((state) => state.profile);

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
										<Button basic color="green" content="主要" />
										<Button basic color="red" icon="trash" />
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

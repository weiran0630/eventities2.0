import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import LoadingComponent from "../../app/common/loadingComponent";
import { getUserProfile } from "../../app/firestore/firestoreService";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { useTypedDispatch, useTypedSelector } from "../../app/store/hooks";
import { listenToSelectedUserProfile } from "../../app/store/slice/profileSlice";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

interface ParamTypes {
	id: string;
}

const ProfilePage: React.FC = () => {
	const { id } = useParams<ParamTypes>();
	const dispatch = useTypedDispatch();
	const { loading, error } = useTypedSelector((state) => state.async);
	const { selectedUserProfile } = useTypedSelector((state) => state.profile);
	const { currentUser } = useTypedSelector((state) => state.auth);

	useFirestoreDoc({
		query: () => getUserProfile(id),
		data: (profile: any) => dispatch(listenToSelectedUserProfile(profile)), // change the selected user instead to prevent current user changes
		dependencies: [dispatch, id],
	});

	if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
		return <LoadingComponent content="載入頁面中..." />;

	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader
					profile={selectedUserProfile!}
					isCurrentUser={currentUser?.uid === selectedUserProfile!.id} // if there's no current user just pass the selected user
				/>

				<ProfileContent
					profile={selectedUserProfile!}
					isCurrentUser={currentUser?.uid === selectedUserProfile!.id}
				/>
			</Grid.Column>
		</Grid>
	);
};

export default ProfilePage;

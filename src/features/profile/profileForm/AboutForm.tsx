import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { updateUserProfile } from "../../../app/firestore/firestoreService";

interface AboutFormProps {
	profile: {
		displayName: string;
		description: string;
	};
	setEditMode: (value: boolean) => void;
}

const AboutForm: React.FC<AboutFormProps> = ({ profile, setEditMode }) => {
	return (
		<Formik
			initialValues={{
				displayName: profile.displayName,
				description: profile.description || "",
			}}
			validationSchema={Yup.object({
				displayName: Yup.string().required("請提供您的暱稱"),
				description: Yup.string(),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					await updateUserProfile(values);
				} catch (error) {
					toast.error(error.message);
				} finally {
					setSubmitting(false);
					setEditMode(false);
				}
			}}
		>
			{({ isSubmitting, isValid, dirty }) => (
				<Form className="ui form">
					<MyTextInput
						name="displayName"
						label="displayName"
						placeholder="用戶名"
					/>
					<MyTextArea
						name="description"
						label="description"
						placeholder="關於"
					/>
					<Button
						floated="right"
						loading={isSubmitting}
						disabled={isSubmitting || !isValid || !dirty}
						type="submit"
						positive
						content="更新頁面"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default AboutForm;

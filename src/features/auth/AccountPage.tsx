import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Segment, Header, Button } from "semantic-ui-react";

import MyTextInput from "../../app/common/form/MyTextInput";
import { useTypedSelector } from "../../app/store/hooks";
import { updateUserPassword } from "../../app/firestore/firebaseService";

const AccountPage: React.FC = () => {
	const { currentUser } = useTypedSelector((state) => state.auth);
	const history = useHistory();

	return (
		<Segment>
			<Header dividing size="large" content="帳號" />

			{/* render components depend on which type of register method */}
			{currentUser.providerId === "password" && (
				<>
					<Header color="teal" sub content="更改密碼" />

					<Formik
						initialValues={{ newPassword1: "", newPassword2: "", auth: "" }}
						validationSchema={Yup.object({
							newPassword1: Yup.string()
								.required("密碼爲必填")
								.min(6, "密碼必須爲6個字符或以上"),
							newPassword2: Yup.string()
								.oneOf(
									[Yup.ref("newPassword1"), null],
									"密碼不相符，請再次確認"
								)
								.required("確認密碼爲必填！"),
						})}
						onSubmit={async (values, { setSubmitting, setErrors }) => {
							try {
								history.push("/events");
								await updateUserPassword(values);
							} catch (error) {
								setErrors({ auth: error.message });
							} finally {
								setSubmitting(false);
							}
						}}
					>
						{({ errors, isSubmitting, isValid, dirty }) => (
							<Form className="ui form">
								<MyTextInput
									name="newPassword1"
									label="newPassword1"
									type="password"
									placeholder="新密碼"
								/>

								<MyTextInput
									name="newPassword2"
									label="newPassword2"
									type="password"
									placeholder="確認新密碼"
								/>

								{errors.auth && (
									<p style={{ color: "red", marginLeft: "0.1em" }}>
										{errors.auth}
									</p>
								)}

								<Button
									type="submit"
									loading={isSubmitting}
									disabled={!isValid || isSubmitting || !dirty}
									style={{ display: "block" }}
									positive
									content="更改密碼"
								/>
							</Form>
						)}
					</Formik>
				</>
			)}

			{currentUser.providerId === "google.com" && (
				<>
					<p>請到 Google 頁面更改您的帳號</p>

					<Button
						icon="google"
						color="google plus"
						style={{ display: "block" }}
						href="https://myaccount.google.com/"
						content="Go to Google"
					/>
				</>
			)}
		</Segment>
	);
};

export default AccountPage;

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Divider } from "semantic-ui-react";

import ModalWrapper from "../../app/common/modal/ModalWrapper";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useTypedDispatch } from "../../app/store/hooks";
import { closeModal } from "../../app/store/slice/modalSlice";
import { signInWithEmail } from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("請輸入正確電郵地址")
		.required("電郵地址爲必填，請重新確認"),
	password: Yup.string().required("請輸入密碼"),
});

const LoginForm: React.FC = () => {
	const dispatch = useTypedDispatch();

	return (
		<ModalWrapper size="mini" header="登入 Eventities">
			<Formik
				initialValues={{ email: "", password: "", auth: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await signInWithEmail(values);
						dispatch(closeModal());
					} catch (error) {
						setErrors({
							auth: "帳號或密碼存在錯誤，請再次確認",
						});
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, errors }) => (
					<Form className="ui form">
						<MyTextInput label="email" name="email" placeholder="電子郵件" />

						<MyTextInput
							label="password"
							name="password"
							type="password"
							placeholder="密碼"
						/>

						{errors.auth && (
							<p style={{ color: "red", marginLeft: "0.1em" }}>{errors.auth}</p>
						)}

						<Button
							fluid
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							size="large"
							color="teal"
							content="登錄"
						/>

						<Divider horizontal content="或您可以" />

						<SocialLogin />
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
};

export default LoginForm;

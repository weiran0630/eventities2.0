import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Divider } from "semantic-ui-react";

import ModalWrapper from "../../app/common/modal/ModalWrapper";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useTypedDispatch } from "../../app/store/hooks";
import { closeModal } from "../../app/store/slice/modalSlice";
import { registerInFirebase } from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const validationSchema = Yup.object({
	displayName: Yup.string().required("用戶名爲必填"),
	email: Yup.string()
		.email("請輸入正確電郵地址")
		.required("電郵地址爲必填，請重新確認"),
	password: Yup.string()
		.required("請輸入密碼")
		.min(6, "密碼必須爲6個字符或以上"),
});

const RegisterForm: React.FC = () => {
	const dispatch = useTypedDispatch();

	return (
		<ModalWrapper size="mini" header="登入Eventities">
			<Formik
				initialValues={{ displayName: "", email: "", password: "", auth: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await registerInFirebase(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (error) {
						setErrors({
							auth: error.message,
						});
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, errors }) => (
					<Form className="ui form">
						<MyTextInput
							label="displayName"
							name="displayName"
							placeholder="用戶名"
						/>

						<MyTextInput
							label="email"
							name="email"
							type="email"
							placeholder="電子郵件"
						/>

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
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							fluid
							size="large"
							color="teal"
							content="註冊"
						/>

						<Divider horizontal content="或您可以" />

						<SocialLogin />
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
};

export default RegisterForm;

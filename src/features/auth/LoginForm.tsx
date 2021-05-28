import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";

import ModalWrapper from "../../app/common/modal/ModalWrapper";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useTypedDispatch } from "../../app/store/hooks";
import { signIn } from "../../app/store/slice/authSlice";
import { closeModal } from "../../app/store/slice/modalSlice";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("請輸入正確電郵地址")
		.required("電郵地址爲必填，請重新確認"),
	password: Yup.string().required("請輸入密碼"),
});

const LoginForm: React.FC = () => {
	const dispatch = useTypedDispatch();
	return (
		<ModalWrapper size="mini" header="登入Eventities">
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(signIn(values.email));
					setSubmitting(false);
					dispatch(closeModal());
				}}
			>
				{({ isSubmitting, dirty, isValid }) => (
					<Form className="ui form">
						<MyTextInput label="email" name="email" placeholder="電子郵件" />
						<MyTextInput
							label="password"
							name="password"
							type="password"
							placeholder="密碼"
						/>
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							fluid
							size="large"
							color="teal"
							content="登錄"
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
};

export default LoginForm;

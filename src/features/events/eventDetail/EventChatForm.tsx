import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { toast } from "react-toastify";
import { Loader, Form } from "semantic-ui-react";
import { addEventChatComment } from "../../../app/firestore/firebaseService";

interface EventChatFormProps {
	eventId: string;
}

const EventChatForm: React.FC<EventChatFormProps> = ({ eventId }) => {
	const formik = useFormik({
		initialValues: { comment: "" },
		validationSchema: Yup.object({ comment: Yup.string().required() }),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				await addEventChatComment(eventId, values.comment);
				resetForm();
			} catch (error) {
				toast.error(error.message);
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<Form style={{ marginTop: 20 }}>
			<div style={{ position: "relative" }}>
				<Loader active={formik.isSubmitting} />
				<textarea
					rows={2}
					name="comment"
					value={formik.values.comment}
					onChange={formik.handleChange}
					placeholder="請輸入您的留言"
					onKeyPress={(e) => {
						if (e.key === "Enter" && e.shiftKey) {
							return;
						}
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							formik.isValid && formik.handleSubmit(); // only able to submit if form is valid (non-empty)
						}
					}}
				/>
			</div>
		</Form>
	);
};

export default EventChatForm;

import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const modalSlice = createSlice({
	name: "modals",
	initialState: initialState,
	reducers: {
		openModal: (state, action) => {
			const { modalType, modalProps } = action.payload;
			return { modalType, modalProps };
		},
		closeModal: () => {
			return null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

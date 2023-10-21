import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  modelName?:
    | "pwa_install"
    | "subscription_success"
    | "notification_permission";
  modalData?: object;
}

const initialState = {
  modelName: "pwa_install", // undefined,
  modalData: {},
} as ModelState;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<ModelState>) => {
      state.modalData = action.payload.modalData;
      state.modelName = action.payload.modelName;
    },
  },
});

export const { setModel } = modalSlice.actions;
export default modalSlice.reducer;

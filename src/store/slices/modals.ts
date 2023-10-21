import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  modelName?: "subscription_success" | "pwa_first" | "notification_permission";
  modalData?: object;
}

const initialState = {
  modelName: undefined,
  modalData: {},
} as ModelState;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModelName: (state, action: PayloadAction<ModelState["modelName"]>) => {
      state.modelName = action.payload;
    },
  },
});

export const { setModelName } = modalSlice.actions;
export default modalSlice.reducer;

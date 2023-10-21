import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  name?: "pwa_install" | "subscription_success" | "notification_permission";
  data?: object;
}

const initialState = {
  data: undefined,
  name: {},
} as ModelState;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<ModelState>) => {
      state.name = action.payload.name;
      state.data = action.payload.data;
    },
  },
});

export const { setModel } = modalSlice.actions;
export default modalSlice.reducer;

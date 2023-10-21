import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  name?: "pwa_install" | "open_in_browser" | "unsupported";
  data?: object;
}

const initialState = {
  data: undefined,
  name: undefined,
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

import { createSlice } from "@reduxjs/toolkit";

const localeSlice = createSlice({
  name: "locale",
  initialState: {
    locale: "",
  },
  reducers: {
    // decremented: (state) => {
    //   state.value -= 1;
    // },
  },
});

// export const { incremented, decremented } = counterSlice.actions;
export default localeSlice.reducer;

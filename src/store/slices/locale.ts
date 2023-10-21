import { createSlice } from "@reduxjs/toolkit";

const localeSlice = createSlice({
  name: "locale",
  initialState: {
    locale: "",
  },
  reducers: {},
});

export default localeSlice.reducer;

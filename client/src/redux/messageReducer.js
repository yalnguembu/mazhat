import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    newMessage: (state, action) => {
      state.push = action.payload;
    },
    deleteMessage: (state, action) => {
      state.filter({ id: action.payload });
    },
  },
});

export const { newMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;

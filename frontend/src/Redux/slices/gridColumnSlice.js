import { createSlice } from '@reduxjs/toolkit';

const numColumnsSlice = createSlice({
  name: 'numColumns',
  initialState: 3, // Initial value
  reducers: {
    setNumColumns: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNumColumns } = numColumnsSlice.actions;
export default numColumnsSlice.reducer;

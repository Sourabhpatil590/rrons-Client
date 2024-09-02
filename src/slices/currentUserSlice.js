import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: { token: null },
	reducers: {
		updateToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { updateToken } = currentUserSlice.actions;

export default currentUserSlice.reducer;

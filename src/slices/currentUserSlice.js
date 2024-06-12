import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: {
		id: 1,
		name: 'Sourabh Patil',
		email: 'sourabhpatil590@gmail.com',
		password: '1234',
		role: 'client',
	},
	reducers: {
		updateUserRole: (state, action) => {
			state.role = action.payload.role;
		},
	},
});

export const { updateUserRole } = currentUserSlice.actions;
export default currentUserSlice.reducer;

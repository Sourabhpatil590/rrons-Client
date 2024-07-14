import { createSlice } from '@reduxjs/toolkit';

const metaDataSlice = createSlice({
	name: 'metaData',
	initialState: {
		loading: false,
		category: [
			{ key: 'nonTechnical', value: 'Non-Technical' },
			{ key: 'exportImport', value: 'Export/Import' },
			{ key: 'logistic', value: 'Logistics' },
			{ key: 'hr', value: 'HR' },
			{ key: 'business', value: 'Business' },
			{
				key: 'marketing',
				value: 'Marketing',
			},
			{ key: 'healthcare', value: 'Healthcare' },
			{ key: 'tech', value: 'Tech' },
			{ key: 'management', value: 'Management' },
			{ key: 'engineering', value: 'Engineering' },
			{ key: 'design', value: 'Design' },
			{ key: 'finance', value: 'Finance' },
			{ key: 'science', value: 'Science' },
			{ key: 'law', value: 'Law' },
		],
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setCategory, removeJob, updateJob } = metaDataSlice.actions;
export default metaDataSlice.reducer;

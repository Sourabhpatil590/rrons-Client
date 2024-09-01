import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
    name: "jobsList",
    initialState: {
        list: [
            {
                id: 1,
                position: "Software Engineer",
                qualification:
                    "Bachelors Degree in Computer Science or related field",
                skills: "React",
                salary: "10000-15000",
                location: "Delhi",
                jobRole: "Software Developer",
                experience: "2-5",
            },
        ],
        latestJobId: 4,
        jobFilter: {
            sorted_by: "DATE_POSTED", // DATE_POSTED / SALARY_HIGH_LOW / SALARY_LOW_HIGH,
            date_posted: "ALL", // ALL / LAST_24_HOURS / LAST_3_DAYS / LAST_7_DAYS
            work_mode: "HIBRID", // HIBRID / WFH / WFO
            experience: 0,
        },
    },
    reducers: {
        addJob: (state, action) => {
            console.log(action.payload);
            state.list = action.payload;
        },
        removeJob: (state, action) => {
            state.list = state.list.filter(
                (job) => job.id !== action.payload.id
            );
        },
        updateJob: (state, action) => {
            const jobToUpdate = state.list.find(
                (job) => job.id === action.payload.id
            );
            Object.assign(jobToUpdate, action.payload);
        },
        updateJobId: (state, action) => {
            state.latestId = action.payload.id;
        },
        updateJobFilter: (state, action) => {
            state.jobFilter = action.payload;
        },
    },
});

export const { addJob, removeJob, updateJob, updateJobFilter } =
    jobsSlice.actions;
export default jobsSlice.reducer;

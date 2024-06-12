import React from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import {
	HomePage,
	FindJobPage,
	AdminPage,
	JobDetailsPage,
	SignInPage,
	AddCandidateProfilePage,
	HireTalent,
	AboutUs,
	ContactUs,
	CandidateLoginPage,
	ProfilePage,
	AppliedCandidates,
	ErrorPage,
} from '../pages';
import { Provider } from 'react-redux';
import store from '../store';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				element={<HomePage />}
			></Route>
			<Route
				path="find-job"
				element={<FindJobPage />}
			></Route>
			<Route
				path="hire-talent"
				element={<HireTalent />}
			></Route>
			<Route
				path="about-us"
				element={<AboutUs />}
			></Route>
			<Route
				path="Contact-us"
				element={<ContactUs />}
			></Route>
			<Route
				path="admin"
				element={<AdminPage />}
			></Route>
			<Route
				path="job-details/"
				element={<JobDetailsPage />}
			></Route>
			<Route
				path="sign-in"
				element={<SignInPage />}
			></Route>
			<Route
				path="candidate-login"
				element={<CandidateLoginPage />}
			></Route>
			<Route
				path="add-candidate-profile"
				element={<AddCandidateProfilePage />}
			></Route>

			<Route
				path="candidate-profile"
				element={<ProfilePage />}
			></Route>
			<Route
				path="applied-candidates"
				element={<AppliedCandidates />}
			></Route>
			<Route
				path="error"
				element={<ErrorPage />}
			></Route>
		</>
	)
);

const RouterComponent = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	);
};

export default RouterComponent;

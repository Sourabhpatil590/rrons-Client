import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { Footer, Header, Button, Loader } from '../../components';
import './loginPage.scss';
import { postService } from '../../serviceAPI/serviceAPI';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser, updateToken } from '../../slices/currentUserSlice';
import {
	login,
	checkIfUserExists,
	generateToken,
} from '../../serviceAPI/UtilityAPIs';

const ForgotPassword = () => {
	const [emailID, setEmailID] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	// Get query parameters from the URL
	const queryParams = new URLSearchParams(window.location.search);
	const jobId = queryParams.get('id');
	const mode = queryParams.get('mode');
	const navigate = useNavigate();

	const handleSuccess = async (response) => {
		let USER_CREDENTIAL;
		try {
			if (response.credential != null) {
				USER_CREDENTIAL = jwtDecode(response.credential);
				setEmailID(USER_CREDENTIAL.email);
				let res = await checkIfUserExists(USER_CREDENTIAL.email);
				if (res.status === 201) {
					let response = await generateToken({
						email: USER_CREDENTIAL.email,
					});
					// console.log('response', response);
					// dispatch(updateToken(response.data.token));
					localStorage.setItem('token', response.data.token);
					setLoading(false);
					navigate('/');
				} else if (res.status === 204) {
					setLoading(false);
					navigate('/register/?email=' + USER_CREDENTIAL.email);
				}
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			let res = await login({
				email: emailID,
				password: password,
			});

			// 201 response means user is already registered
			if (res.status === 200) {
				// dispatch(updateToken(res.data.token));
				localStorage.setItem('token', res.data.token);
				setLoading(false);
				navigate('/');

				// 204 response means user is not registered
			} else if (res.status === 204) {
				setLoading(false);
				navigate('/register/?email=' + emailID);
			}

			// 204 response means invalid credentials
			else if (res.status === 401) {
				setLoading(false);
				alert('Invalid email or password');
			}
		} catch (error) {
			setLoading(false);
			alert('Invalid email or password');
			console.log('error', error);
		}
	};
	return (
		<Container fluid>
			{loading && <Loader />}
			<Header />

			<Row className="d-flex justify-content-center">
				<Col
					md={3}
					className="p-5 m-5 border border-dark rounded shadow-lg"
				>
					<form
						// onSubmit={handleSubmit}
						className="Login-form"
					>
						<div className="form-group">
							<Row>
								<label htmlFor="exampleInputEmail1">
									Email address
								</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									onChange={(e) => setEmailID(e.target.value)}
									required={true}
								/>
							</Row>
							<Row>
								<label htmlFor="exampleInputEmail1">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id=" "
									aria-describedby="emailHelp"
									placeholder="Enter password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required={true}
								/>
							</Row>
						</div>
						<Row>
							<Col>
								<Button
									// type="submit"
									className="btn btn-primary m-2"
									text="Next"
									onClick={handleSubmit}
								/>
							</Col>

							{/* <Col className="d-flex align-content-center">
								<Link
									to="/sign-in"
									className="text-decoration-none align-content-center"
								>
									{' '}
									login as Admin{' '}
								</Link>
							</Col> */}
							<Col className="d-flex align-content-center">
								<Link
									to="/forgot-password"
									className="text-decoration-none align-content-center"
								>
									{' '}
									forgot password{' '}
								</Link>
							</Col>
						</Row>
						<Row>
							<Col>
								<GoogleLogin
									clientId="218213514434-e106glouiaj4lhgk48ffibf7dgqpkgd5.apps.googleusercontent.com"
									onSuccess={(res) => {
										handleSuccess(res);
										// await handleSubmit();
									}}
									onFailure={(response) => {
										console.log('response', response);
									}}
								/>
							</Col>
						</Row>
					</form>
				</Col>
			</Row>
			<Footer />
		</Container>
	);
};

export default ForgotPassword;

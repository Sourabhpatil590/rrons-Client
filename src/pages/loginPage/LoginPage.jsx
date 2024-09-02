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

const LoginPage = () => {
	const [emailID, setEmailID] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

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
								<Col className="align-center-col text blue-text text-700 text-22">
									{' '}
									Welcome
								</Col>
							</Row>
							<Row className="py-2">
								<Col className="align-center-col light-blue-text text text-16">
									{' '}
									Please enter your details to sign in
								</Col>
							</Row>
							<Row>
								<Col className="align-center-col py-2">
									<GoogleLogin
										clientId="218213514434-e106glouiaj4lhgk48ffibf7dgqpkgd5.apps.googleusercontent.com"
										onSuccess={(res) => {
											handleSuccess(res);
										}}
										onFailure={(response) => {
											console.log('response', response);
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<hr />
								</Col>
								<Col
									md="auto"
									className="align-center-col
									text
									light-blue-text
									text-300
									text-12 py-1 px-0"
								>
									{' '}
									OR
								</Col>
								<Col>
									<hr />
								</Col>
							</Row>
							<Row className="py-2">
								{/* <label htmlFor="exampleInputEmail1">
									Email address
								</label> */}
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
							<Row className="py-2">
								{/* <label htmlFor="exampleInputEmail1">
									Password
								</label> */}
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
							<Col className="d-flex align-content-center justify-content-end">
								<Link
									to="/forgot-password"
									className="text-decoration-none align-content-center  text text-14 blue-text"
								>
									{' '}
									Forgot password{' '}
								</Link>
							</Col>
						</Row>
						<Row>
							<Col
								md={12}
								className="p-0"
							>
								<Button
									className="btn btn-primary my-2 login-button"
									text="Login"
									onClick={handleSubmit}
								/>
							</Col>
						</Row>

						<Row className="justify-content-center">
							<Col
								md="auto"
								className="d-flex align-content-center"
							>
								<Link
									to="/register"
									className="text-decoration-none align-content-center justify-content-center text blue-text text-12 my-1"
								>
									{' '}
									Don’t have an account yet! Register Now{' '}
								</Link>
							</Col>
						</Row>
					</form>
				</Col>
			</Row>
			<Footer />
		</Container>
	);
};

export default LoginPage;

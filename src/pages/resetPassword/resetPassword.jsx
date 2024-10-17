import React, { useRef } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Footer, Header } from '../../components';
import { Button, Loader } from '../../components';
import { putService } from '../../serviceAPI/serviceAPI';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
	const password = useRef();
	const confirmPassword = useRef();
	const [searchParams] = useSearchParams();
	const emailId = searchParams.get('email');
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (password.current.value !== confirmPassword.current.value) {
			alert('Passwords do not match');
			return;
		}
		// Call the reset password API
		try {
			await putService('api/users/reset-password', {
				emailId,
				password: password.current.value,
			});
			navigate('/login');
		} catch (err) {
			console.error('Error resetting password:', err);
			window.alert(`Error resetting password`);
		}
	};
	return (
		<Container fluid>
			<Header />
			<Row className="d-flex justify-content-center align-items-center py-3">
				<Col className="col-4 border-1 rounded-1 border border-dark m-3">
					<Row>
						<Col>
							<h1 className="text blue-text medium-text m-3">
								Reset Password
							</h1>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<input
								type="password"
								placeholder="Enter password"
								name="password"
								className="text blue-text text-16 rounded border border-dark m-3 p-2"
								ref={password}
							></input>
						</Col>
					</Row>
					<Row>
						<Col>
							<input
								type="text"
								placeholder="Enter confirm password"
								name="confirmPassword"
								className="text blue-text text-16 rounded border border-dark m-3 p-2"
								ref={confirmPassword}
							></input>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col className="d-flex justify-content-center m-3">
							<Button
								className="p-2"
								text="Submit"
								onClick={handleSubmit}
							/>
						</Col>
					</Row>
				</Col>
			</Row>

			<Footer />
		</Container>
	);
};

export default ResetPassword;

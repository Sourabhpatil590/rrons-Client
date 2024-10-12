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
		<Container>
			<Header />
			<Row>
				<Col>
					<h1>Reset Password</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type="password"
						placeholder="Enter password"
						name="password"
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
						ref={confirmPassword}
					></input>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button
						text="Submit"
						onClick={handleSubmit}
					/>
				</Col>
			</Row>

			<Footer />
		</Container>
	);
};

export default ResetPassword;

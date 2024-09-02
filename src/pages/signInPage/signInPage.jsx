import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { updateUser } from './../../slices/currentUserSlice';
import { Header } from '../../components';

const SignInPage = () => {
	const user = useSelector((state) => state.currentUser.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const verifyUser = (e) => {
		e.preventDefault();
		if (
			'sourabhpatil590@gmail.com' === e.target.email.value &&
			'1234' === e.target.password.value
		) {
			console.log('User verified');
			navigate('/admin');
		} else {
			alert('Invalid credentials');
		}
	};

	return (
		<Container>
			<Header />
			<Row className="d-flex justify-content-center">
				<Col
					md={4}
					className="p-5 m-5 border border-dark rounded shadow-lg"
				>
					<Form onSubmit={verifyUser}>
						<Form.Group
							className="mb-3"
							controlId="formBasicEmail"
						>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								name="email"
								type="email"
								placeholder="Enter email"
								required={true}
							/>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="Password"
								required={true}
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default SignInPage;

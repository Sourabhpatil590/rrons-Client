import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Footer, Header } from '../../components';
import { useState } from 'react';
import { Button } from '../../components';
import { postService } from '../../serviceAPI/serviceAPI';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
	const [otp, setOtp] = useState('');
	const [generatedOTP, setGeneratedOTP] = useState('');
	const [emailID, setEmailID] = useState('');
	const [showOTPInput, setShowOTPInput] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setOtp(e.target.value);
	};

	const generateOTP = () => {
		const otp = Math.floor(1000 + Math.random() * 9000);
		setGeneratedOTP(otp.toString());
		return otp.toString();
	};

	const sendGenerateOTP = () => {
		console.log('send generate called');
		if (!emailID) {
			alert('Email ID is required');
			return;
		}
		let otp = generateOTP();
		try {
			postService('/api/users/send-otp-email', {
				emailID: emailID,
				otp: otp,
			});
			setShowOTPInput(true);
		} catch (error) {
			console.log(error);
		}
	};

	const verifyOTP = () => {
		if (otp === generatedOTP) {
			navigate(`/reset-password?email=${emailID}`);
		} else {
			alert('Invalid OTP');
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
								Enter registered email ID
							</h1>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col className="col-12 d-flex justify-content-center">
							<input
								placeholder="Enter your registered email address"
								value={emailID}
								onChange={(e) => setEmailID(e.target.value)}
								className="text blue-text text-16 rounded border border-dark m-3 p-2"
								width="100%"
								type="email"
							></input>
						</Col>
					</Row>
					<Row>
						<Col className="d-flex justify-content-center m-3">
							<Button
								className="p-2"
								text="Generate OTP"
								onClick={sendGenerateOTP}
							/>
						</Col>
					</Row>
					{showOTPInput && (
						<>
							<hr />
							<Row>
								<Col>
									<h1 className="text blue-text medium-text m-3">
										Enter OTP
									</h1>
								</Col>
							</Row>
							<Row>
								<Col className="col-12 d-flex justify-content-center">
									<input
										value={otp}
										name="otp"
										onChange={handleChange}
										className="text blue-text text-16 rounded border border-dark m-3 p-2"
										maxLength="4"
									></input>
								</Col>
							</Row>
							<Row>
								<Col className="d-flex justify-content-center m-3">
									<Button
										className="p-2"
										text="Verify"
										onClick={verifyOTP}
									/>
								</Col>
							</Row>
						</>
					)}
				</Col>
			</Row>

			<Footer />
		</Container>
	);
};

export default VerifyOTP;

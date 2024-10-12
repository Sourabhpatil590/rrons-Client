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
			let res = postService('/api/users/send-otp-email', {
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
		<Container>
			<Header />
			<Row>
				<Col>
					<h1>Enter registered email ID</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						placeholder="Enter your email ID"
						value={emailID}
						onChange={(e) => setEmailID(e.target.value)}
					></input>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button
						text="Generate OTP"
						onClick={sendGenerateOTP}
					/>
				</Col>
			</Row>
			{showOTPInput && (
				<>
					<Row>
						<Col>
							<h1>Enter OTP</h1>
						</Col>
					</Row>
					<Row>
						<Col>
							<input
								value={otp}
								name="otp"
								onChange={handleChange}
							></input>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button
								text="Verify"
								onClick={verifyOTP}
							/>
						</Col>
					</Row>
				</>
			)}
			<Footer />
		</Container>
	);
};

export default VerifyOTP;

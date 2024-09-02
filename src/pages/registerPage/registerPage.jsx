import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Header, Loader, Button } from '../../components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import {
	postService,
	putService,
	getService,
} from '../../serviceAPI/serviceAPI';
import './registerPage.scss';

const RegisterPage = () => {
	const initialFormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		contact: '',
		skills: '',
		education: '',
		expectedSalary: '',
		experience: '',
		resume: '',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const URL = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(URL.search);
	const jobId = params.get('position');
	const mode = params.get('mode');
	const candidateId = params.get('id');
	const email = params.get('email');

	let dropdownData = {
		years: ['Years', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		months: ['Months', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		noticePeriod: ['', 'Immediate joining', 15, 30, 45, 60, 90],
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowMessage(false);
		if (
			mode !== 'update' &&
			formData.password !== formData.confirmPassword
		) {
			setMessage("Password and confirm password doesn't match");
			setShowMessage(true);
			return;
		}
		setLoading(true);
		let res;
		let body = {
			...formData,
			// resume: document.querySelector('.file-input').files[0],
		};
		delete body.confirmPassword;
		try {
			// if mode is update then update the candidate else create new candidate
			if (mode === 'update') {
				body.id = candidateId;
				res = await putService(`/api/users/${candidateId}`, body, true);
			} else {
				res = await postService('/api/users/register', body, true);
			}

			// if job id given then apply for the job
			if (jobId !== null && jobId !== undefined) {
				res = await postService(`/api/jobs/apply/${jobId}`, {
					candidate: res.data._id,
				});
				if (res.status === 201) {
					setLoading(false);
					navigate('/find-job/?applied=true&type=new');
				}
			} else {
				setLoading(false);
				mode === 'update'
					? navigate(`/candidate-profile/?id=${candidateId}`)
					: navigate('/login');
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			if (error.response.status === 404) {
				setMessage('Candidate already exists with this email ID');
				setShowMessage(true);
			}
		}
	};

	useEffect(() => {
		if (mode === 'update') {
			async function fetchData() {
				try {
					setLoading(true);
					const { data } = await getService(
						`/api/users/${candidateId}`
					);
					console.log('data', data);
					setLoading(false);
					setFormData({ ...data });
				} catch (error) {
					setLoading(false);
					setMessage(
						'Something went wrong, please refresh or re-login'
					);
					setShowMessage(true);
				}
			}
			fetchData();
		}
		if (email !== null) {
			setFormData({ ...FormData, email });
		}
		// setLoading(false);
	}, []);
	return (
		<Container fluid>
			{loading ? <Loader /> : null}
			<Header />
			<Row
				md={12}
				className="justify-content-center"
			>
				<Col md={8}>
					<Form onSubmit={handleSubmit}>
						<Col className="job-input-form">
							<Row>
								<Col className="align-center-col text blue-text text-700 text-22 py-2">
									{mode === 'update'
										? 'Update Profile'
										: 'Create your profile'}
								</Col>
							</Row>
							<Row className="py-2">
								<Col className="align-center-col light-blue-text text text-16">
									{' '}
									Search and apply to job from Indian’s No. 1
									job site
								</Col>
							</Row>
							<hr />
							{showMessage && (
								<div
									class="alert alert-warning"
									role="alert"
								>
									{message}
								</div>
							)}
							<Row>
								<Col>
									<Row className="">
										<Col
											md="auto"
											className="text blue-text"
										>
											<Form.Label
												className="label"
												htmlFor="name"
											>
												First Name
											</Form.Label>
										</Col>
									</Row>
									<Row className="p-1">
										<Col className="">
											<Form.Control
												className="input"
												required="true"
												value={formData.firstName}
												name="firstName"
												onChange={handleChange}
												type="text"
												placeholder="Enter your first name"
											/>
										</Col>
									</Row>
									<Row className="p-1">
										<Col md="auto">
											<Form.Label
												className="label text blue-text pt-3"
												htmlFor="email"
											>
												Email ID
											</Form.Label>
										</Col>
									</Row>
									<Row>
										<Col>
											{' '}
											<Form.Control
												required="true"
												value={formData.email}
												onChange={handleChange}
												type="email"
												name="email"
												disabled={
													mode === 'update'
														? true
														: false
												}
											/>
										</Col>
									</Row>
									{mode !== 'update' && (
										<>
											<Row className="p-1">
												<Col md="auto">
													<Form.Label className="label text blue-text pt-3">
														Password
													</Form.Label>
												</Col>
											</Row>
											<Row>
												<Col>
													{' '}
													<Form.Control
														required="true"
														value={
															formData.password
														}
														onChange={handleChange}
														type="password"
														name="password"
														minLength="8"
														placeholder="Minimum 8 characters"
													/>
												</Col>
											</Row>
										</>
									)}
									<Row className="p-1">
										<Col md="auto">
											<Form.Label
												className="label text blue-text pt-3"
												htmlFor="curretSalary"
											>
												Current salary
											</Form.Label>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Control
												required="true"
												value={formData.currentSalary}
												onChange={handleChange}
												type="text"
												name="currentSalary"
												placeholder="Enter your current salary per month"
											/>
										</Col>
									</Row>
								</Col>
								<Col>
									<Row className="">
										<Col
											md="auto"
											className=""
										>
											<Form.Label
												className="label text blue-text "
												htmlFor="lastName"
											>
												Last Name
											</Form.Label>
										</Col>
									</Row>
									<Row className="p-1">
										<Col className="">
											<Form.Control
												className="input"
												required="true"
												value={formData.lastName}
												name="lastName"
												onChange={handleChange}
												type="text"
												placeholder="Enter your Last name"
											/>
										</Col>
									</Row>
									<Row className="p-1">
										<Col md="auto">
											<Form.Label
												className="label text blue-text pt-3"
												htmlFor="contactNumber"
											>
												Contact Number
											</Form.Label>
										</Col>
									</Row>
									<Row>
										<Col>
											{' '}
											<Form.Control
												required="true"
												value={formData.contact}
												onChange={handleChange}
												type="text"
												name="contact"
												pattern="[7-9]{1}[0-9]{9}"
											/>
										</Col>
									</Row>
									{mode !== 'update' && (
										<>
											<Row className="p-1">
												<Col md="auto">
													<Form.Label
														className="label text blue-text pt-3"
														htmlFor="confirmPassword"
													>
														Confirm password
													</Form.Label>
												</Col>
											</Row>
											<Row>
												<Col>
													{' '}
													<Form.Control
														required="true"
														value={
															formData.confirmPassword
														}
														onChange={handleChange}
														type="confirmPassword"
														name="confirmPassword"
														minLength="8"
														placeholder='Enter as same as "Password"'
													/>
												</Col>
											</Row>
										</>
									)}
									<Row className="p-1">
										<Col md="auto">
											<Form.Label
												className="label text blue-text pt-3"
												htmlFor="expectedSalary"
											>
												Expected salary
											</Form.Label>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Control
												required="true"
												value={formData.expectedSalary}
												onChange={handleChange}
												type="text"
												name="expectedSalary"
												placeholder="Enter your expected salary per month"
											/>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row className="pt-3">
								<Col md="auto">
									<Form.Label
										className="label text blue-text pt-3"
										htmlFor="skills"
									>
										Skill Set
									</Form.Label>
								</Col>
								<Col>
									<Form.Control
										required="true"
										value={formData.skills}
										onChange={handleChange}
										as="textarea"
										name="skills"
									/>
								</Col>
							</Row>

							<Row className="p-1">
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header>
											Education
										</Accordion.Header>
										<Accordion.Body>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Qualification/Degree
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.qualification
														}
														onChange={handleChange}
														type="text"
														name="qualification"
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Collage name
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={formData.collage}
														onChange={handleChange}
														type="text"
														name="collage"
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Grade/Percentage
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.collageGrade
														}
														onChange={handleChange}
														type="text"
														name="collageGrade"
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Passing year
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.passingYear
														}
														onChange={handleChange}
														type="text"
														name="passingYear"
													/>
												</Col>
											</Row>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</Row>
							<Row className="p-1">
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header>
											Experience
										</Accordion.Header>
										<Accordion.Body>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text pt-3">
														Company
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.currentCompany
														}
														onChange={handleChange}
														type="text"
														name="currentCompany"
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Designation
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.designation
														}
														onChange={handleChange}
														type="text"
														name="designation"
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Total experience
													</Form.Label>
												</Col>
												<Col>
													<Form.Select
														aria-label="years"
														name="experienceInYears"
														onChange={handleChange}
														value={
															formData.experienceInYears
														}
													>
														{dropdownData.years.map(
															(year) => (
																<option
																	value={year}
																>
																	{year}
																</option>
															)
														)}
													</Form.Select>
												</Col>
												<Col>
													<Form.Select
														aria-label="years"
														onChange={handleChange}
														value={
															formData.experienceInMonths
														}
														name="experienceInMonths"
													>
														{dropdownData.months.map(
															(month) => (
																<option
																	value={
																		month
																	}
																>
																	{month}
																</option>
															)
														)}
													</Form.Select>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Location
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.location
														}
														onChange={handleChange}
														type="text"
														name="location"
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Work experience
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData.workExperience
														}
														onChange={handleChange}
														as="textarea"
														name="workExperience"
														rows={5}
													/>
												</Col>
											</Row>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</Row>
							<Row className="pt-3">
								<Col md={4}>
									<Form.Label className="label text blue-text">
										Notice period in days
									</Form.Label>
								</Col>
								<Col md="auto">
									<Form.Select
										aria-label="notice-period"
										onChange={handleChange}
										value={formData.noticePeriod}
										name="noticePeriod"
									>
										{dropdownData.noticePeriod.map((np) => (
											<option value={np}>{np}</option>
										))}
									</Form.Select>
								</Col>
							</Row>
							<Row className="pt-3">
								<Col md="auto">
									<Form.Label
										className="label text blue-text"
										htmlFor="resume"
									>
										Resume
									</Form.Label>
								</Col>
								<Col>
									<Form.Control
										required={
											mode === 'update' ? false : true
										}
										onChange={(e) => {
											setFormData({
												...formData,
												resume: e.target.files[0],
											});
										}}
										type="file"
										name="resume"
										className="file-input"
										accept="application/pdf"
									/>
								</Col>
							</Row>

							<hr />
							<Row className="p-1 m-2 justify-content-around">
								<Col md="auto">
									<Button
										variant="primary"
										type="submit"
										text={
											mode === 'update'
												? 'Update'
												: 'Register now'
										}
									/>
								</Col>
							</Row>
						</Col>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default RegisterPage;

import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Header, Loader, Button, Footer } from '../../components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { RiDeleteBin6Line } from 'react-icons/ri';
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
		gender: '',
		email: '',
		password: '',
		confirmPassword: '',
		contact: '',
		skills: '',
		expectedSalary: '',
		experience: [],
		resume: '',
		currentSalary: '',
		qualification: '',
		collage: '',
		collageGrade: '',
		passingYear: '',
		noticePeriod: '',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const [numberOfExperienceArr, setNumberOfExperienceArr] = useState([]);
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
		genderList: ['Male', 'Female', 'Other'],
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		let numberOfExperienceArr = [];
		for (let i = 0; i < formData?.experience.length; i++) {
			numberOfExperienceArr.push(i);
		}
		setNumberOfExperienceArr(numberOfExperienceArr);
	}, [formData?.experience]);

	const handleAddExperience = () => {
		setFormData({
			...formData,
			experience: [
				...formData?.experience,
				{
					currentCompany: '',
					designation: '',
					experienceInYears: 0,
					experienceInMonths: 0,
					location: '',
					workExperience: '',
				},
			],
		});
	};

	const handleExperienceDelete = (e, index) => {
		console.log('delete called');
		let experienceArr = formData?.experience;
		experienceArr.splice(index, 1);
		setFormData({ ...formData, experience: experienceArr });
	};

	const handleExperienceChange = (e, index) => {
		let experienceArr = formData?.experience;
		experienceArr[index][e.target.name] = e.target.value;
		setFormData({ ...formData, experience: experienceArr });
	};

	const handleSubmit = async () => {
		console.log('handle submit called');
		// e.preventDefault();
		setShowMessage(false);
		if (
			mode !== 'update' &&
			formData.password !== formData.confirmPassword
		) {
			setMessage("Password and confirm password doesn't match");
			setShowMessage(true);
			return;
		}

		let res;
		let body = {
			...formData,
			experience: JSON.stringify(formData?.experience),
		};
		delete body.confirmPassword;
		try {
			// if mode is update then update the candidate else create new candidate
			if (mode === 'update') {
				body.id = candidateId;
				setLoading(true);
				res = await putService(`/api/users/${candidateId}`, body, true);
				setLoading(false);
			} else {
				setLoading(true);
				res = await postService('/api/users/register', body, true);
				setLoading(false);
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
				mode === 'update'
					? navigate(`/candidate-profile/?id=${candidateId}`)
					: navigate('/login');
			}
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
					setLoading(false);
					setFormData({ ...data });
					let numberOfExperienceArr = [];
					for (let i = 0; i < data.experience.length; i++) {
						numberOfExperienceArr.push(i);
					}
					setNumberOfExperienceArr(numberOfExperienceArr);
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
		setLoading(false);
	}, []);
	return (
		<Container fluid>
			{loading ? <Loader /> : null}
			<Header />
			<Row
				md={12}
				className="justify-content-center"
			>
				<Col
					md={8}
					xs={11}
				>
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
								Search and apply to job from Indian’s No. 1 job
								site
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
											value={formData?.firstName}
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
											value={formData?.email}
											onChange={handleChange}
											type="email"
											name="email"
											disabled={
												mode === 'update' ? true : false
											}
										/>
									</Col>
								</Row>
								<Row className="p-1">
									<Col md="auto">
										<Form.Label
											className="label text blue-text pt-3"
											htmlFor="gender"
										>
											Gender
										</Form.Label>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Select
											aria-label="gender"
											name="gender"
											onChange={(e) => handleChange(e)}
											value={formData?.gender}
										>
											{dropdownData.genderList.map(
												(gender, index) => (
													<option
														key={index}
														value={gender}
													>
														{gender}
													</option>
												)
											)}
										</Form.Select>
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
													value={formData?.password}
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
											htmlFor="currentSalary"
										>
											Current salary/month
										</Form.Label>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Control
											required="true"
											value={formData?.currentSalary}
											onChange={handleChange}
											type="text"
											name="currentSalary"
											className="mb-2"
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
											value={formData?.lastName}
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
											value={formData?.contact}
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
														formData?.confirmPassword
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
											Expected salary/month
										</Form.Label>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Control
											required="true"
											value={formData?.expectedSalary}
											onChange={handleChange}
											type="text"
											name="expectedSalary"
											placeholder="Enter your expected salary per month"
										/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
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
													value={formData?.password}
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
							</Col>
							<Col>
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
														formData?.confirmPassword
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
														formData?.qualification
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
													value={formData?.collage}
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
														formData?.collageGrade
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
														formData?.passingYear
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
						{numberOfExperienceArr?.map((index) => (
							<Row
								key={index}
								className="p-1"
							>
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header>
											<Row>
												<Col>
													Experience {index + 1}
												</Col>
											</Row>
										</Accordion.Header>
										<Accordion.Body>
											<Row className="d-flex justify-content-end">
												<Col
													md="auto"
													className="m-2"
												>
													<RiDeleteBin6Line
														onClick={(e) =>
															handleExperienceDelete(
																e,
																index
															)
														}
													/>
												</Col>
											</Row>
											<Row className="p-1">
												<Col md={4}>
													<Form.Label className="label text blue-text">
														Company
													</Form.Label>
												</Col>
												<Col>
													<Form.Control
														required="true"
														value={
															formData
																?.experience[
																index
															]?.currentCompany
														}
														onChange={(e) =>
															handleExperienceChange(
																e,
																index
															)
														}
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
															formData
																?.experience[
																index
															]?.designation
														}
														onChange={(e) =>
															handleExperienceChange(
																e,
																index
															)
														}
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
														onChange={(e) =>
															handleExperienceChange(
																e,
																index
															)
														}
														value={
															formData
																?.experience[
																index
															]?.experienceInYears
														}
													>
														{dropdownData.years.map(
															(year, index) => (
																<option
																	key={index}
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
														onChange={(e) =>
															handleExperienceChange(
																e,
																index
															)
														}
														value={
															formData
																?.experience[
																index
															]
																?.experienceInMonths
														}
														name="experienceInMonths"
													>
														{dropdownData.months.map(
															(month, index) => (
																<option
																	key={index}
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
															formData
																?.experience[
																index
															]?.location
														}
														onChange={(e) =>
															handleExperienceChange(
																e,
																index
															)
														}
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
															formData
																?.experience[
																index
															]?.workExperience
														}
														onChange={(e) =>
															handleExperienceChange(
																e,
																index
															)
														}
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
						))}
						<Row>
							<Col className="pink-text d-flex justify-content-end">
								<Button
									className="pink-text text"
									text="+ Add experience"
									onClick={() => handleAddExperience()}
								/>
							</Col>
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
									value={formData?.noticePeriod}
									name="noticePeriod"
								>
									{dropdownData.noticePeriod.map(
										(np, index) => (
											<option
												key={index}
												value={np}
											>
												{np}
											</option>
										)
									)}
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
									required={mode === 'update' ? false : true}
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
							<Col
								md="auto"
								className="d-flex justify-content-center"
							>
								<Button
									variant="primary"
									onClick={handleSubmit}
									text={
										mode === 'update'
											? 'Update'
											: 'Register now'
									}
								/>
							</Col>
						</Row>
					</Col>
				</Col>
			</Row>
			<Footer />
		</Container>
	);
};

export default RegisterPage;

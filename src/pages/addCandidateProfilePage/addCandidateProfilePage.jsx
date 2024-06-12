import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Header, Loader, Button } from '../../components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	postService,
	putService,
	getService,
} from '../../serviceAPI/serviceAPI';

const AddCandidateProfilePage = () => {
	const [name, setName] = useState(null);
	const [emailID, setEmailID] = useState('');
	const [contactNumber, setContactNumber] = useState('');
	const [skills, setSkills] = useState('');
	const [education, setEducation] = useState('');
	const [expectedSalary, setExpectedSalary] = useState('');
	const [experience, setExperience] = useState('');
	const [resume, setResume] = useState();
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const URL = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(URL.search);
	const jobId = params.get('position');
	const mode = params.get('mode');
	const candidateId = params.get('id');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowMessage(false);
		setLoading(true);
		let res;
		let body = {
			name: name,
			email: emailID,
			contact: contactNumber,
			skills: skills,
			education: education,
			expectedSalary: expectedSalary,
			experience: experience,
			resume: document.querySelector('.file-input').files[0],
		};
		try {
			// if mode is update then update the candidate else create new candidate
			if (mode === 'update') {
				body.id = candidateId;
				res = await putService(`/api/users/${candidateId}`, body, true);
			} else {
				res = await postService('/api/users/create', body, true);
			}
			console.log(res.data._id);
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
				navigate('/candidate-profile/?id=' + res.data._id);
			}
		} catch (error) {
			console.log(error);
			if (error.response.status === 404) {
				setMessage('Candidate already exists with this email ID');
				setShowMessage(true);
			}
		}
	};

	useEffect(() => {
		setLoading(true);
		if (mode === 'update') {
			async function fetchData() {
				try {
					const res = await getService(`/api/users/${candidateId}`);
					setLoading(false);
					setName(res.data.name);
					setEmailID(res.data.email);
					setContactNumber(res.data.contact);
					setSkills(res.data.skills);
					setEducation(res.data.education);
					setExpectedSalary(res.data.expectedSalary);
					setExperience(res.data.experience);
				} catch (error) {
					console.log(error);
				}
			}
			fetchData();
		}
		setLoading(false);
	}, []);
	return (
		<Container fluid>
			{loading ? <Loader /> : null}
			<Header />
			<Form onSubmit={handleSubmit}>
				<Row md={12}>
					<Col md={4}></Col>
					<Col
						md={4}
						className="job-input-form"
					>
						<Row>
							<h2>
								{mode === 'update'
									? 'Update Profile'
									: 'Register your profile'}
							</h2>
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
						<Row className="p-1">
							<Col
								md={4}
								className=""
							>
								<Form.Label
									className="label"
									htmlFor="name"
								>
									Full Name
								</Form.Label>
							</Col>
							<Col className="">
								<Form.Control
									className="input"
									required="true"
									value={name}
									name="name"
									onChange={(e) => setName(e.target.value)}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="email"
								>
									Email ID
								</Form.Label>
							</Col>
							<Col>
								{' '}
								<Form.Control
									required="true"
									value={emailID}
									onChange={(e) => setEmailID(e.target.value)}
									type="email"
									name="email"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="contactNumber"
								>
									Contact Number
								</Form.Label>
							</Col>
							<Col>
								{' '}
								<Form.Control
									required="true"
									value={contactNumber}
									onChange={(e) =>
										setContactNumber(e.target.value)
									}
									type="text"
									name="contactNumber"
									pattern="[7-9]{1}[0-9]{9}"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="skills"
								>
									Skill Set
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={skills}
									onChange={(e) => setSkills(e.target.value)}
									type="text"
									name="skills"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="education"
								>
									Education
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={education}
									onChange={(e) =>
										setEducation(e.target.value)
									}
									type="text"
									name="education"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="salary"
								>
									Expected Salary/month
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={expectedSalary}
									onChange={(e) =>
										setExpectedSalary(e.target.value)
									}
									type="text"
									name="salary"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="experience"
								>
									Experience
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={experience}
									onChange={(e) =>
										setExperience(e.target.value)
									}
									type="text"
									name="experience"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="resume"
								>
									Resume
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required={mode === 'update' ? false : true}
									value={resume}
									onChange={(e) => {
										console.log(e.target.files);
										// setResume(e.target.files[0]);
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
									text={mode === 'update' ? 'Update' : 'Save'}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default AddCandidateProfilePage;

import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { Button } from '../../components';
import { useDispatch } from 'react-redux';
import { addJob, updateJob } from '../../slices/jobsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../components';
import axios from 'axios';
import { categoryDropdown } from '../commonData/categoryDropdown';
import {
	putService,
	postService,
	getService,
} from '../../serviceAPI/serviceAPI';
import NewJobDetailsPage from '../../components/jobCard/newJobDetailsPage';

const JobDetailsPage = () => {

	const navigate = useNavigate();
	const [job, setJob] = useState({});
	const URL = useLocation();
	const params = new URLSearchParams(URL.search);
	const mode = params.get('mode');
	const id = params.get('id');
	const [position, setPosition] = useState();
	const [location, setLocation] = useState();
	const [company, setCompany] = useState();
	const [description, setDescription] = useState();
	const [category, setCategory] = useState();
	const [vacancy, setVacancy] = useState();
	const [skills, setSkills] = useState([]);
	const [salary, setSalary] = useState();
	const [experience, setExperience] = useState();
	const [qualification, setQualification] = useState();


	useEffect(() => {
		if (mode === 'update') {
			getService(`/api/jobs/${id}`).then((res) => {
				setJob(res.data);
			});
		}
	}, []);

	useEffect(() => {
		if (mode === 'update') {
			setPosition(job.title);
			setLocation(job.location);
			setCompany(job.company);
			setDescription(job.description);
			setCategory(job.category);
			setVacancy(job.vacancy);
			setSkills(job.skills);
			setSalary(job.salary);
			setExperience(job.experience);
			setQualification(job.qualification);
		}
	}, [job]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let jobObj = {
			title: position,
			description: description,
			company: company,
			location: location,
			skills: skills,
			salary: salary,
			experience: experience,
			qualification: qualification,
			vacancy: vacancy,
			status: 'open',
			category: category,
		};
		try {
			if (mode === 'update') {
				try {
					putService(`/api/jobs/${id}`, jobObj).then((res) => {
						console.log('response:', res);
						navigate('/admin');
					});
				} catch (error) {
					console.log('error', error);
					// navigate('/error');
				}
			} else {
				postService('/api/jobs/', jobObj).then((res) => {
					console.log('response:', res);
					navigate('/admin');
				});
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<Container fluid>
			<Header />
			<NewJobDetailsPage />
			<Form onSubmit={handleSubmit}>
				<Row md={12}>
					<Col md={4}></Col>
					<Col
						md={3}
						className="job-input-form"
					>
						<Row>
							<h2>Job Details</h2>
						</Row>
						<hr />
						<Row className="p-1">
							<Col
								md={4}
								className="align-center-col"
							>
								<Form.Label
									className="label"
									htmlFor="position"
								>
									Position
								</Form.Label>
							</Col>
							<Col className="">
								<Form.Control
									className="input"
									required="true"
									value={position}
									name="position"
									onChange={(e) =>
										setPosition(e.target.value)
									}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col
								md={4}
								className="align-center-col"
							>
								<Form.Label
									className="label"
									htmlFor="description"
								>
									Description
								</Form.Label>
							</Col>
							<Col className="">
								<Form.Control
									className="input"
									required="true"
									value={description}
									name="position"
									onChange={(e) =>
										setDescription(e.target.value)
									}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="company"
								>
									Company
								</Form.Label>
							</Col>
							<Col>
								{' '}
								<Form.Control
									required="true"
									value={company}
									onChange={(e) => setCompany(e.target.value)}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="location"
								>
									Location
								</Form.Label>
							</Col>
							<Col>
								{' '}
								<Form.Control
									required="true"
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="skills"
								>
									Skills
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={skills}
									onChange={(e) => setSkills(e.target.value)}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="qualification"
								>
									Qualification
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={qualification}
									onChange={(e) =>
										setQualification(e.target.value)
									}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="salary"
								>
									Salary
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									value={salary}
									onChange={(e) => setSalary(e.target.value)}
									type="text"
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
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="vacancy"
								>
									Vacancies available
								</Form.Label>
							</Col>
							<Col>
								<Form.Control
									required="true"
									name="vacancy"
									value={vacancy}
									onChange={(e) => setVacancy(e.target.value)}
									type="text"
								/>
							</Col>
						</Row>
						<Row className="p-1">
							<Col md={4}>
								<Form.Label
									className="label"
									htmlFor="vacancy"
								>
									Category
								</Form.Label>
							</Col>
							<Col>
								<select
									required="true"
									name="category"
									value={category}
									onChange={(e) => {
										console.log(
											'e.target.value:',
											e.target.value
										);
										setCategory(e.target.value);
									}}
									type="text"
								>
									{categoryDropdown.map((category) => (
										<option value={category.key}>
											{category.value}
										</option>
									))}
								</select>
							</Col>
						</Row>

						<hr />
						<Row className="p-1 m-2 justify-content-around">
							<Col md="auto">
								<Button
									variant="primary"
									type="submit"
									text="Save"
								/>
							</Col>
							<Col md="auto">
								<Button
									variant="primary"
									onClick={() => navigate('/admin')}
									text="Cancel"
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default JobDetailsPage;

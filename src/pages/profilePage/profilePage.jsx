import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Footer, Header, Loader } from '../../components';
import { getService, putService } from '../../serviceAPI/serviceAPI';
import './profile.scss';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { CiLocationOn } from 'react-icons/ci';
import { PiBriefcaseThin } from 'react-icons/pi';
import { IoCallOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { GiSandsOfTime } from 'react-icons/gi';

const ProfilePage = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const id = searchParams.get('id');
	const [data, setData] = useState(null);
	const [show, setShow] = useState(false);
	const [resume, setResume] = useState();
	const [loading, setLoading] = useState(false);
	const [employmentArr, setEmploymentArr] = useState([]);
	const navigate = useNavigate();

	const updateResume = async () => {
		const formData = new FormData();
		formData.append('resume', resume);
		try {
			setLoading(true);
			await putService(
				`/api/users/update-resume/${id}`,
				{ resume },
				true
			);
			setLoading(false);
			alert('Resume updated successfully');
		} catch (error) {
			setLoading(false);
			alert('Error updating resume, please retry');
		}
	};
	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			try {
				const res = await getService(`/api/users/${id}`);
				setLoading(false);

				setData(res.data);
				let employmentArr = [];
				for (let i = 0; i < res.data.experience.length; i++) {
					let employmentObj = {
						designation: res.data.experience[i].designation,
						company: res.data.experience[i].currentCompany,
						experience:
							res.data.experience[i].experienceInYears +
							' years ' +
							res.data.experience[i].experienceInMonths +
							' months',
						location: res.data.experience[i].location,
						workExperience: res.data.experience[i].workExperience,
					};
					employmentArr.push(employmentObj);
				}
				setEmploymentArr(employmentArr);
			} catch (error) {
				setLoading(false);
				alert('Error fetching data, please retry');
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const showResume = async () => {
		try {
			setLoading(true);
			const res = await getService(`/api/users/resume/${id}`);
			console.log(res);
			const blob = new Blob([new Uint8Array(res?.data.data.data)], {
				type: 'application/pdf',
			});
			console.log('blob', blob);
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = 'resume.pdf';
			setResume(link);
			// link.click();
			setShow(true);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<Container
			fluid
			className="blue-background"
		>
			{loading && <Loader />}
			<Header />
			<Row
				md={12}
				className="justify-center-row parent-row"
			>
				<Col
					className="parent-col"
					md={8}
				>
					<Row
						md={12}
						className="first-row"
					>
						<Col
							md={3}
							className="top-banner"
						>
							<img
								src={
									data?.gender === 'Male'
										? '/male.png'
										: '/woman.png'
								}
								alt="profile"
							></img>
						</Col>
						<Col md={9}>
							<Row className="d-flex justify-content-between">
								<Col
									className="text blue-text text-600 text-24"
									md="auto"
								>
									{data?.firstName + ' ' + data?.lastName}
								</Col>
								<Col
									className="blue-text"
									md="auto"
								>
									<FiEdit
										onClick={() =>
											navigate(
												`/register?mode=update&id=${id}`
											)
										}
									/>
								</Col>
							</Row>
							<Row className="text text-600 text-18 medium-blue-text py-1">
								<Col>{data?.experience[0]?.designation}</Col>
							</Row>
							<Row className="text text-400 text-16 medium-blue-text py-1">
								<Col>
									{'at ' +
										data?.experience[0]?.currentCompany}
								</Col>
							</Row>
							<hr />
							<Row>
								<Col>
									<Row className="row-padding">
										<Col
											className="blue-text me-2"
											md={1}
										>
											<CiLocationOn />{' '}
										</Col>
										<Col className="text text-400 text-16 medium-blue-text">
											{data?.experience[0]?.location}
										</Col>
									</Row>
									<Row className="row-padding">
										<Col
											md={1}
											className="blue-text me-2"
										>
											<PiBriefcaseThin />{' '}
										</Col>
										<Col className="text text-400 text-16 medium-blue-text">{`${data?.experience[0]?.experienceInYears} years ${data?.experience[0]?.experienceInMonths} months`}</Col>
									</Row>
									<Row className="row-padding">
										<Col
											md={1}
											className="blue-text me-2"
										>
											{' '}
											<RiMoneyRupeeCircleLine />{' '}
										</Col>
										<Col className="text text-400 text-16 medium-blue-text">
											{data?.currentSalary}
										</Col>
									</Row>
								</Col>
								<Col>
									<Row className="row-padding">
										<Col
											md={1}
											className="blue-text me-2"
										>
											{' '}
											<IoCallOutline />{' '}
										</Col>
										<Col className="text text-400 text-16 medium-blue-text">
											{data?.contact}
										</Col>
									</Row>
									<Row className="row-padding">
										<Col
											md={1}
											className="blue-text me-2"
										>
											{' '}
											<MdOutlineEmail />{' '}
										</Col>
										<Col className="text text-400 text-16 medium-blue-text">
											{data?.email}
										</Col>
									</Row>
									<Row className="row-padding">
										<Col
											md={1}
											className="blue-text me-2"
										>
											{' '}
											<GiSandsOfTime />{' '}
										</Col>
										<Col className="text text-400 text-16 medium-blue-text">
											{data?.noticePeriod + ' days'}
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="skill-row d-flex justify-content-center blue-background">
				<Col
					md={8}
					className="white-background skill-col"
				>
					<Row>
						<Col className="text blue-text text-600 text-18 skill-text">
							Update resume
						</Col>
					</Row>
					<Row>
						<Col className="d-flex justify-content-center">
							<input
								type="file"
								text="Upload resume"
								onChange={(e) => setResume(e.target.files[0])}
							/>
						</Col>
					</Row>
					<Row>
						<Col className="d-flex justify-content-end">
							<Button
								text="Save"
								onClick={updateResume}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="skill-row d-flex justify-content-center blue-background">
				<Col
					md={8}
					className="white-background skill-col"
				>
					<Row>
						<Col className="text blue-text text-600 text-18 skill-text">
							Key skills
						</Col>
					</Row>
					<Row>
						{data?.skills &&
							data?.skills[0].split(',').map((skill, index) => (
								<Col
									key={index}
									md="auto"
									className="skill-box text medium-blue-text text-400 text-16"
								>
									{skill}
								</Col>
							))}
					</Row>
				</Col>
			</Row>

			<Row className="d-flex justify-content-center">
				<Col
					md={8}
					className="employment-card white-background"
				>
					<Row>
						<Col
							md={8}
							className="text blue-text text-600 text-18 employment-text"
						>
							Employment
						</Col>
					</Row>
					{employmentArr.map((data, index) => (
						<>
							<Row className="row-padding">
								<Col
									md={8}
									className="text text-600 text-18 blue-text"
								>
									{data?.designation}
								</Col>
							</Row>
							<Row className="row-padding">
								<Col
									md={8}
									className="text text-600 text-16 medium-blue-text"
								>
									{data?.currentCompany}
								</Col>
							</Row>
							<Row md="auto">
								<Col className="text text-400 text-16 medium-blue-text">
									{data?.workExperience}
								</Col>
							</Row>
						</>
					))}
				</Col>
			</Row>

			<Row className="d-flex justify-content-center">
				<Col
					md={8}
					className="white-background resume-card"
				>
					<Row>
						<Col>
							<p className="resume-text text blue-text text-600 text-18">
								Resume:
							</p>
						</Col>
					</Row>
					<Row className="d-flex justify-content-center p-4">
						<Col md="auto">
							<Button
								text="View resume"
								onClick={showResume}
							/>
						</Col>
					</Row>
					<Row>
						{show && (
							<object
								width="100%"
								height="1000"
								data={resume}
								type="application/pdf"
							>
								{' '}
							</object>
						)}
					</Row>
				</Col>
			</Row>

			<Footer />
		</Container>
	);
};

export default ProfilePage;

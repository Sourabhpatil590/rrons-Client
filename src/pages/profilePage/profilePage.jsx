import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Footer, Header, Loader } from '../../components';
import { getService } from '../../serviceAPI/serviceAPI';
import './profile.scss';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const id = searchParams.get('id');
	const [data, setData] = useState(null);
	const [show, setShow] = useState(false);
	const [resume, setResume] = useState();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			try {
				const res = await getService(`/api/users/${id}`);
				setLoading(false);
				setData(res.data);
			} catch (error) {
				setLoading(false);
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
		<Container fluid>
			{loading && <Loader />}
			<Header />
			<Row
				md={12}
				className="justify-center-row p-3"
			>
				<Col
					md={6}
					className="p-3"
				>
					<h1>Profile details</h1>
				</Col>
				<Col>
					<Button
						text="Edit"
						onClick={() =>
							navigate(
								`/add-candidate-profile/?mode=update&id=${id}`
							)
						}
					/>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Name:</p>
				</Col>
				<Col md={4}>
					<p>{data?.name}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>email:</p>
				</Col>
				<Col md={4}>
					<p>{data?.email}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Contact:</p>
				</Col>
				<Col md={4}>
					<p>{data?.contact}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Education:</p>
				</Col>
				<Col md={4}>
					<p>{data?.education}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Experience</p>
				</Col>
				<Col md={4}>
					<p>{data?.experience}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Skills</p>
				</Col>
				<Col md={4}>
					<p>{data?.skills}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Expected Salary</p>
				</Col>
				<Col md={4}>
					<p>{data?.expectedSalary}</p>
				</Col>
			</Row>
			<Row className="justify-center-row">
				<Col md={2}>
					<p>Resume:</p>
				</Col>
				<Col md={4}>
					<Button
						text="View resume"
						onClick={showResume}
					/>
				</Col>
			</Row>
			{show && (
				<Row className="justify-center-row">
					{/* <Document file={{ data: resume }} /> */}
					<object
						width="100%"
						height="1000"
						data={resume}
						type="application/pdf"
					>
						{' '}
					</object>
					{/* <p>resume</p> */}
				</Row>
			)}
			<Footer />
		</Container>
	);
};

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Footer, JobCard, Header, Button } from '../../components';
import { updateToken } from '../../slices/currentUserSlice';
import { useNavigate } from 'react-router-dom';
import { getService } from '../../serviceAPI/serviceAPI';

const AdminPage = () => {
	const [jobsList, setJobsList] = useState([]);
	const [titleMessage, setTitleMessage] = useState('Open Positions');
	const [jobStatus, setJobStatus] = useState('open');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signOut = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	const getAllJobs = async (_status = 'open') => {
		try {
			const res = await getService(`/api/jobs/?status=${_status}`);
			setTitleMessage('Open Positions');
			setJobsList(res.data);
		} catch (error) {
			console.log('error', error);
		}
	};

	const getClosedPosition = async () => {
		await getAllJobs('closed');
		setTitleMessage('Closed Positions');
		setJobStatus('closed');
	};

	useEffect(() => {
		getAllJobs();
	}, []);
	return (
		<Container fluid>
			<Header />
			<Row className="d-flex justify-content-end pt-3">
				<Col
					md="auto"
					className="align-center-col"
				>
					<Button
						onClick={() => navigate('/job-details/?mode=add')}
						text="Add new job"
					/>
				</Col>
				<Col
					md="auto"
					className="align-center-col"
				>
					<Button
						onClick={() => getAllJobs('open')}
						text="Open Positions"
					/>
				</Col>
				<Col
					md="auto"
					className="align-center-col"
				>
					<Button
						onClick={getClosedPosition}
						text="Closed Positions"
					/>
				</Col>
				<Col md={1}>
					<Button
						onClick={signOut}
						text="Logout"
					/>
				</Col>
			</Row>

			<Row className="d-flex justify-content-center">
				<Col
					md={3}
					className="m-3"
				>
					<h2> {titleMessage}</h2>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				{jobsList.length !== 0 &&
					jobsList.map((job) => (
						<JobCard
							key={job._id}
							job={job}
						/>
					))}
				{jobsList.length === 0 && (
					<p className="text-center p-5 m-5">
						No Open positions available
					</p>
				)}
			</Row>
			<Footer />
		</Container>
	);
};

export default AdminPage;

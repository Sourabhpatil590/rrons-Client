import React from 'react';
import { Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getService } from '../../serviceAPI/serviceAPI';
import { Button } from './../index';

const RecentJobs = () => {
	const [jobList, setJobList] = useState([]); // Use the useState hook
	const navigate = useNavigate();

	let mapping = {
		nonTechnical: 'Non-Technical',
		exportImport: 'Export/Import',
		logistic: 'Logistic',
		hr: 'HR',
		business: 'Business',
		marketingAndCommunication: 'Marketing and Communication',
		healthcare: 'Healthcare',
		tech: 'Tech',
		management: 'Management',
		engineering: 'Engineering',
		design: 'Design',
		finance: 'Finance',
		science: 'Science',
		law: 'Law',
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getService('/api/jobs/?status=open&limit=5');
				setJobList(res.data);
			} catch (error) {
				console.log('error:', error);
				// navigate('/error');
			}
		}
		fetchData();
	}, []);
	return (
		<>
			<Row className="d-flex justify-content-center p-3">
				<Col
					md="auto"
					className="p-3"
				>
					<h3>Recent Jobs</h3>
				</Col>
			</Row>

			<Stack>
				{jobList.map((job) => (
					<Row
						className="d-flex justify-content-center"
						key={job._id}
						md={12}
					>
						<Col
							md={6}
							className="job-item"
						>
							<Row>
								<Col
									className=""
									md={6}
								>
									{' '}
									<h4>{job.title}</h4>
								</Col>
								<Col>
									<p>{job.description}</p>
								</Col>
							</Row>

							<Row>
								<Col
									md={2}
									className="pe-3"
								>
									Category:
								</Col>
								<Col md={4}>
									<p>{mapping[job.category]}</p>
								</Col>
								<Col>
									<p>Location:</p>
								</Col>
								<Col>
									<p>{job.location}</p>
								</Col>
							</Row>
							<Row>
								<Col md={2}>Company:</Col>
								<Col md={4}>
									<p>{job.company}</p>
								</Col>
								<Col>
									<p>Date:</p>
								</Col>
								<Col>
									<p>{job.updatedAt.split('T')[0]}</p>
								</Col>
							</Row>
						</Col>

						<Col
							md={3}
							className="job-item align-center-col align-content-center"
						>
							<Button
								onClick={() =>
									navigate(`/candidate-login/?id=${job._id}`)
								}
								text="Apply"
							/>
						</Col>
						<hr></hr>
					</Row>
				))}
			</Stack>
		</>
	);
};

export default RecentJobs;

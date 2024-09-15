import React from 'react';
import { Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getService } from '../../serviceAPI/serviceAPI';
import { Button } from './../index';
import './recentJobs.scss';
import { IoLocationOutline } from 'react-icons/io5';

const RecentJobs = () => {
	const [jobList, setJobList] = useState([]); // Use the useState hook
	const navigate = useNavigate();

	let mapping = {
		nonTechnical: 'Non-Technical',
		exportImport: 'Export/Import',
		logistic: 'Logistic',
		hr: 'HR',
		business: 'Business',
		marketing: 'Marketing',
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
				const res = await getService('/api/jobs/?status=open&limit=4');
				setJobList(res.data);
			} catch (error) {
				console.log('error:', error);
				// navigate('/error');
			}
		}
		fetchData();
	}, []);
	return (
		<div className="recent-jobs">
			<Row className="d-flex justify-content-center p-5">
				<Stack>
					<h2 className="text large-text blue-text text-center pb-3">
						Job of the Day
					</h2>
					<p className="text text-400 light-blue-text text-center">
						Let’s work together and explore opportunities.
					</p>
				</Stack>
			</Row>

			<Row
				md={12}
				className="d-flex justify-content-center"
			>
				{jobList.map((job) => (
					<Col
						md={3}
						sm={8}
						xs={10}
						className="job-item"
						key={job._id}
					>
						<Stack>
							<h4 className="text blue-text text-600">
								{job.title}
							</h4>
							<p className="company text blue-text text-600">
								{job.company}
							</p>
							<p className="location text blue-text">
								<IoLocationOutline className="me-2" />
								{job.location}
							</p>
							<div className="job-description text light-blue-text">
								{job.description}
							</div>

							<Row className="d-flex justify-content-between">
								<Col>
									<p className="text light-blue-text">
										{job.updatedAt.split('T')[0]}
									</p>
								</Col>
								<Col md="auto">
									<Button
										onClick={() =>
											navigate(`/login/?id=${job._id}`)
										}
										text="Apply Now >"
									/>
								</Col>
							</Row>
						</Stack>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default RecentJobs;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
	Header,
	Footer,
	AppliedCandidatesTable,
	Loader,
} from '../../components';
import { useSelector } from 'react-redux';
import { getService } from '../../serviceAPI/serviceAPI';

const AppliedCandidates = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const jobId = searchParams.get('id');
	const [candidateList, setCandidateList] = useState([]);
	const [job, setJob] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res = await getService(
					`/api/jobs/applied-candidates/${jobId}`
				);
				setJob(res.data.job);
				setCandidateList(res.data.list);
			} catch (error) {
				console.log('error', error);
			}
		};

		fetchData();
	}, []);

	return (
		<Container fluid>
			{!job ? (
				<Loader />
			) : (
				<>
					<Header />
					<Row>
						<h1>Applied Candidates</h1>
					</Row>
					<Row>
						<Col>
							<h2>Job Title:</h2>
						</Col>
						<Col>
							<h3>{job.title}</h3>
						</Col>
						<Row>
							<AppliedCandidatesTable data={candidateList} />
						</Row>
					</Row>
					<Footer />
				</>
			)}
		</Container>
	);
};

export default AppliedCandidates;

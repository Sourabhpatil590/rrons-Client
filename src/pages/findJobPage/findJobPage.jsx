import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { JobCard, Header, Toast, Footer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole } from '../../slices/currentUserSlice';
import { useState } from 'react';
import { getService } from '../../serviceAPI/serviceAPI';
import { NewJobCard } from '../../components/jobCard/jobCard';
import { JobSearchBar } from '../../components/jobs/jobSearchBar';
import { JobsFilterLayout } from '../../components/jobs/jobFilter';

const FindJobPage = () => {
	// const jobsList = useSelector((state) => state.jobsList.list);
	let [jobsList, setJobsList] = useState([]);
	const [showToast, setShowToast] = useState(false);
	const [ToastMessage, setToastMessage] = useState('');
	const dispatch = useDispatch();
	dispatch(updateUserRole({ role: 'client' }));
	let searchParams = new URLSearchParams(window.location.search);

	const filters = useSelector((state) => state.jobsList.jobFilter);

	useEffect(() => {
		const applied = searchParams.get('applied');
		const type = searchParams.get('type');
		const category = searchParams.get('category');

		if (applied === 'true') {
			if (type === 'already-applied') {
				setToastMessage('You have already applied for this job!');
			} else if (type === 'new') {
				setToastMessage('You have successfully applied for this job!');
			}
			setShowToast(true);
		}
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
		const fetchData = async () => {
			try {
				let res = await getService(
					`/api/jobs/?status=open&category=${category}&wmode=WFH`
				);
				setJobsList(res.data);
			} catch (error) {
				console.log('error:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const applied = searchParams.get('applied');
		const type = searchParams.get('type');
		const category = searchParams.get('category');
		const fetchData = async () => {
			try {
				let res = await getService(
					`/api/jobs/?status=open&wmode=${filters.work_mode}&exp=${filters.experience}`
				);
				setJobsList(res.data);
			} catch (error) {
				console.log('error:', error);
			}
		};
		fetchData();
	}, [filters]);

	// console.log(jobsList);

	return (
		<Container fluid>
			<Header />
			{showToast && <Toast message={ToastMessage} />}
			<Row>
				<Col>
					<h2 className="text-center py-3">Open Job Positions</h2>
				</Col>
			</Row>
			<Row
				style={{
					// width: "700px",
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Col
					className="m-2 mb-5"
					style={{
						// width: "700px",
						maxWidth: '800px',
						// display: "flex",
						// justifyContent: "center",
						// alignItems: "center",
					}}
				>
					<JobSearchBar />
				</Col>
			</Row>
			<Row>
				<Col
					sm={2}
					className="blue"
				>
					<JobsFilterLayout />
				</Col>
				<Col sm={8}>
					<Row className="d-flex justify-content-center gap-4">
						{jobsList.length !== 0 &&
							jobsList?.map(
								(job) => <NewJobCard job={job} />
								// <JobCard job={job} />
							)}
						{jobsList.length === 0 && (
							<p className="text-center p-5 m-5">
								No Jobs found for this category
							</p>
						)}
					</Row>
				</Col>
			</Row>
			<Footer />
		</Container>
	);
};

export default FindJobPage;

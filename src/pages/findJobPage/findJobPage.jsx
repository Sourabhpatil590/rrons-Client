import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { JobCard, Header, Toast, Footer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../slices/currentUserSlice';
import { useState } from 'react';
import { getService } from '../../serviceAPI/serviceAPI';

const FindJobPage = () => {
	let [jobsList, setJobsList] = useState([]);
	const [showToast, setShowToast] = useState(true);
	const [ToastMessage, setToastMessage] = useState('');
	const dispatch = useDispatch();
	let searchParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		const category = searchParams.get('category');

		const fetchData = async () => {
			try {
				let res = await getService(
					`/api/jobs/?status=open&category=${category}`
				);
				setJobsList(res.data);
			} catch (error) {
				console.log('error:', error);
			}
		};
		fetchData();
	}, []);

	console.log('show toast:', showToast);

	return (
		<Container fluid>
			<Header />
			{showToast && <Toast message={ToastMessage} />}

			<Row>
				<Col>
					<h2 className="text-center py-3">Open Job Positions</h2>
				</Col>
			</Row>

			<Row className="d-flex justify-content-center">
				{jobsList.length !== 0 &&
					jobsList?.map((job) => (
						<JobCard
							job={job}
							setShowToast={setShowToast}
							setToastMessage={setToastMessage}
						/>
					))}
				{jobsList.length === 0 && (
					<p className="text-center p-5 m-5">
						No Jobs found for this category
					</p>
				)}
			</Row>
			<Footer />
		</Container>
	);
};

export default FindJobPage;

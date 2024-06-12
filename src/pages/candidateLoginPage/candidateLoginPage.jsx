import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { Footer, Header, Button, Loader } from '../../components';
import './candidateLoginPage.scss';
import { getService, postService } from '../../serviceAPI/serviceAPI';
import { Link } from 'react-router-dom';

const CandidateLoginPage = () => {
	const [emailID, setEmailID] = useState('');
	const [loading, setLoading] = useState(false);

	// Get query parameters from the URL
	const queryParams = new URLSearchParams(window.location.search);
	const jobId = queryParams.get('id');
	const mode = queryParams.get('mode');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			// check if user is already registered
			let res = await postService('/api/users/check', { email: emailID });

			// 201 response means user is already registered
			if (res.status === 201) {
				// if mode is viewProfile then redirect to candidate profile page
				if (mode === 'viewProfile') {
					setLoading(false);
					navigate('/candidate-profile/?id=' + res.data._id);
					return;
				}
				const { data: job } = await getService(`/api/jobs/${jobId}`);

				// check if user has already applied for the job
				if (job.appliedCandidates.includes(res.data._id)) {
					navigate('/find-job/?applied=true&type=already-applied');
				} else {
					await postService(`/api/jobs/apply/${jobId}`, {
						candidate: res.data._id,
					});
					navigate('/find-job/?applied=true&type=new');
				}
				// 204 response means user is not registered
			} else if (res.status === 204) {
				setLoading(false);
				if (mode === 'viewProfile') {
					navigate('/add-candidate-profile/?mode=viewProfile');
				} else {
					navigate('/add-candidate-profile/?position=' + jobId);
				}
			}
		} catch (error) {
			setLoading(false);
			console.log('error', error);
		}
	};
	return (
		<Container fluid>
			{loading && <Loader />}
			<Header />

			<Row className="d-flex justify-content-center">
				<Col
					md={3}
					className="p-5 m-5 border border-dark rounded shadow-lg"
				>
					<form
						onSubmit={handleSubmit}
						class="Login-form"
					>
						<div class="form-group">
							<Row>
								<label for="exampleInputEmail1">
									Email address
								</label>
								<input
									type="email"
									class="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									onChange={(e) => setEmailID(e.target.value)}
									required={true}
								/>
							</Row>
						</div>
						<Row>
							<Col>
								<Button
									type="submit"
									className="btn btn-primary m-2"
									text="Next"
								/>
							</Col>
							<Col className="d-flex align-content-center">
								<Link
									to="/sign-in"
									className="text-decoration-none align-content-center"
								>
									{' '}
									login as Admin{' '}
								</Link>
							</Col>
						</Row>
					</form>
				</Col>
			</Row>
			<Footer />
		</Container>
	);
};

export default CandidateLoginPage;

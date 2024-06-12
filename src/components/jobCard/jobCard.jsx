import { Col, Row } from 'react-bootstrap';
import { Button } from '../../components';
import './jobCard.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ConfirmationModal } from '../../components';
import { deleteService, putService } from '../../serviceAPI/serviceAPI';
import { mapping } from '../../pages/commonData/categoryDropdown';

function JobCard(props) {
	const role = useSelector((state) => state.currentUser.role);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalMessage, setModalMessage] = useState('');
	const navigate = useNavigate();

	const closePosition = async (e) => {
		try {
			await deleteService(`/api/jobs/${props.job._id}`);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const reOpenPosition = async (e) => {
		console.log('re-open');
		try {
			await putService(`/api/jobs/re-open/${props.job._id}`);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const handleClosePosition = async (e) => {
		setModalTitle('Close Position');
		setModalMessage('Are you sure you want to close this position?');
		setShowConfirmation(true);
	};

	const handleReOpenPosition = (e) => {
		setModalMessage('Are you sure you want to re-open this position?');
		setModalTitle('Re-open Position');
		setShowConfirmation(true);
	};

	const handleConfirmation = async () => {
		setShowConfirmation(false);
		if (modalTitle === 'Close Position') await closePosition();
		if (modalTitle === 'Re-open Position') await reOpenPosition();
	};

	const handleCancelConfirmation = () => {
		setShowConfirmation(false);
	};

	const appliedCandidates = (e) => {
		navigate(`/applied-candidates/?id=${props.job._id}`);
	};

	return (
		<>
			<ConfirmationModal
				show={showConfirmation}
				title={modalTitle}
				message={modalMessage}
				onConfirm={handleConfirmation}
				onCancel={handleCancelConfirmation}
			/>
			<Col
				md={3}
				className="p-3 job-card m-2"
			>
				<Row className="job-card-title">
					<Col>
						<h3>{props.job.title}</h3>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={4}>
						<p className="fw-bold">Description</p>
					</Col>
					<Col>
						<p>{props.job.description}</p>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Company</p>
					</Col>
					<Col>
						<p>{props.job.company}</p>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Location</p>
					</Col>
					<Col>
						<p>{props.job.location}</p>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Skills</p>
					</Col>
					<Col>
						<p>{props.job.skills}</p>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Qualification</p>
					</Col>
					<Col>
						<p>{props.job.qualification}</p>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Salary</p>
					</Col>
					<Col>{props.job.salary}</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Experience</p>
					</Col>
					<Col>{props.job.experience}</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Vacancies</p>
					</Col>
					<Col>{props.job.vacancy}</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Category</p>
					</Col>
					<Col>{mapping[props.job.category]}</Col>
				</Row>
				<Row>
					<Col md={4}>
						<p className="fw-bold">Status</p>
					</Col>
					<Col>{props.job.status}</Col>
				</Row>
				<hr />
				<Row>
					{role === 'admin' ? (
						<Col className="d-flex justify-content-center">
							<Button
								onClick={() =>
									navigate(
										`/job-details/?mode=update&id=${props.job._id}`
									)
								}
								text="Update"
							/>
							<Button
								onClick={
									props.job.status === 'open'
										? handleClosePosition
										: handleReOpenPosition
								}
								text={
									props.job.status === 'open'
										? 'Close'
										: 'Re-open'
								}
							/>
							<Button
								onClick={appliedCandidates}
								text="Applied candidates"
							/>
						</Col>
					) : (
						<Col className="d-flex justify-content-center">
							<Button
								onClick={() =>
									navigate(
										`/candidate-login/?id=${props.job._id}`
									)
								}
								text="Apply"
							/>
						</Col>
					)}
				</Row>
			</Col>
		</>
	);
}

// Move the export statement outside of the function component
export default JobCard;

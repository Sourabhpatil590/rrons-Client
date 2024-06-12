import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmationModal(props) {
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={props.show}
			onHide={props.handleClose}
		>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.message}</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={props.onCancel}
				>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={props.onConfirm}
				>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmationModal;

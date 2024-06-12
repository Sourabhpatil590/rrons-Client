import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './toast.scss';

const Toast = (props) => {
	return (
		<Row
			md={12}
			className="d-flex justify-content-center toast-row"
		>
			<Col
				md={4}
				className="toast-col"
			>
				<p className="toast-text">{props.message}</p>
			</Col>
		</Row>
	);
};

export default Toast;

{
	/* <div
			aria-live="polite"
			aria-atomic="true"
			style={{ position: 'relative', 'min-height': '200px' }}
		>
			<div
				class="toast"
				style={{ position: 'absolute', top: 0, right: 0 }}
			>
				<div class="toast-header">
					<img
						src="..."
						class="rounded mr-2"
						alt="..."
					/>
					<strong class="mr-auto">Rrons Manpower</strong>
					<small>11 mins ago</small>
					<button
						type="button"
						class="ml-2 mb-1 close"
						data-dismiss="toast"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="toast-body">{props.message}</div>
			</div>
		</div> */
}

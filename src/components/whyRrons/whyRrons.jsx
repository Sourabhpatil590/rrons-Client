import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './whyRrons.scss';

const WhyRrons = () => {
	return (
		<Row className="why-row d-flex justify-content-center">
			<Row className="d-flex justify-content-center">
				<Col
					md="auto"
					className="p-3"
				>
					<h3 className="p-3 title">Why Rrons?</h3>
				</Col>
			</Row>
			<Row>
				<Col>
					<Row className="d-flex justify-content-end">
						<Col
							md={3}
							className="p-3  "
						>
							<h1 className="large-element">1k</h1>
						</Col>
						<Col
							md={3}
							className="p-3 d-flex align-items-center"
						>
							<p className="m-0">
								Applications Received per vacancy
							</p>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row className="d-flex justify-content-center">
						<Col
							md={3}
							className="p-3 large-element"
						>
							15
						</Col>
						<Col
							md={3}
							className="p-3 d-flex align-items-center"
						>
							Number of Clients
						</Col>
					</Row>
				</Col>
				<Col>
					<Row className="d-flex justify-content-start">
						<Col
							md={2}
							className="p-3 large-element"
						>
							3
						</Col>
						<Col
							md={3}
							className="p-3 d-flex align-items-center"
						>
							Front end employees
						</Col>
					</Row>
				</Col>
			</Row>
		</Row>
	);
};

export default WhyRrons;

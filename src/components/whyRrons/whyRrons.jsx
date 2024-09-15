import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './whyRrons.scss';
import Button from '../button/button';

const WhyRrons = () => {
	return (
		<Row className="why-row d-flex justify-content-center">
			{/* <Row className="d-flex justify-content-center">
				<Col
					md="auto"
					className="p-3"
				>
					<h3 className="p-3 title">Why Rrons?</h3>
				</Col>
			</Row> */}
			<Row className="pt-3">
				<Col>
					<Row className="d-flex justify-content-end align-items-center">
						<Col
							md={3}
							className="m-1"
						>
							<h1 className="large-element text-center">1k</h1>
						</Col>
						<Col
							md={3}
							className="m-1 d-flex align-items-center"
						>
							<p className="m-0 text-center">
								Applications Received per vacancy
							</p>
						</Col>
					</Row>
				</Col>
				<Col>
					{/* <Row className="d-flex justify-content-center ">
						<Col
							md={3}
							className="m-1"
						>
							<h1 className="large-element">15</h1>
						</Col>
						<Col
							md={3}
							className="m-1 d-flex align-items-center"
						>
							<p className="m-0">Number of Clients</p>
						</Col>
					</Row> */}
					<Row className="d-flex justify-content-center">
						<Col
							md={3}
							className="m-1 large-element"
						>
							<h1 className="large-element text-center">15</h1>
						</Col>
						<Col
							md={3}
							className="m-1 d-flex align-items-center"
						>
							<p className="m-0 text-center">Number of Clients</p>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row className="d-flex justify-content-start">
						<Col
							md={2}
							className="m-1 large-element"
						>
							<h1 className="large-element text-center">3</h1>
						</Col>
						<Col
							md={3}
							className="m-1 d-flex align-items-center"
						>
							<p className="m-0 text-center">
								Front end employees
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="py-5">
				<div className="d-flex justify-content-center align-items-center">
					<h3 className="d-inline-block text-center  pe-3">
						To know more about us
					</h3>
					<Button text="Contact Us" />
				</div>
			</Row>
		</Row>
	);
};

export default WhyRrons;

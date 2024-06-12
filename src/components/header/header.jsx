import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<Row
			className="header-row d-flex"
			md={12}
		>
			{/* <Col md={1}></Col> */}
			<Col
				md={1}
				className="align-center-col ps-5"
			>
				<Link to="/">
					<img
						src="/logo.jpg"
						alt="logo"
						className="header-logo"
					/>
				</Link>
			</Col>
			<Col
				md={3}
				className="d-flex"
			>
				<Link
					to="/"
					className="text-decoration-none"
				>
					<h3 className="header-title">Rrons Manpower</h3>
				</Link>
			</Col>
			<Col className="d-flex justify-content-end p-2 pe-5">
				<Col
					md="auto"
					className="align-bottom-col"
				>
					<Link
						to="/"
						className="header-subtitle pe-4"
					>
						Home
					</Link>
				</Col>
				<Col
					md="auto"
					className="align-bottom-col"
				>
					<Link
						to="/find-job"
						className="header-subtitle pe-4"
					>
						Find Job
					</Link>
				</Col>
				{/* <Col
					md="auto"
					className="align-bottom-col"
				>
					<Link
						to="/about-us"
						className="header-subtitle pe-4"
					>
						About Us
					</Link>
				</Col> */}

				<Col
					md="auto"
					className="align-bottom-col "
				>
					<Link
						to="/candidate-login/?mode=viewProfile"
						className="header-subtitle pe-4"
					>
						Profile
					</Link>
				</Col>
			</Col>
		</Row>
	);
};

export default Header;

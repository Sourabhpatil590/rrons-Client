import React from 'react';
import { Col, Row, Container, Stack } from 'react-bootstrap';
import './footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<Container
			fluid
			className="footer"
		>
			<Row
				md={12}
				// className="bg-dark"
			>
				<Col md={1}></Col>
				<Col
					md={4}
					className="pt-3"
				>
					<Row md={12}>
						<div className="pb-3 text-white">Email :</div>
						<Stack
							gap={2}
							className="pb-5"
						>
							<div className=" text-white">contact@rrons.com</div>
							<div className=" text-white">
								hr.manpower@gmail.com
							</div>
						</Stack>
					</Row>
					<Row>
						<Stack
							gap={2}
							className="pb-5"
						>
							<div className=" text-white">Address :</div>
							<div className=" text-white">
								Parbhani District Maharashtra
							</div>
						</Stack>
					</Row>
					<Row className="pb-3">
						<Stack gap={2}>
							<div className=" text-white">Contact Us :</div>
							<div className=" text-white">+91 9021585790</div>
							<div className=" text-white">+91 7559219442</div>
						</Stack>
					</Row>
				</Col>
				<Col
					md={4}
					className="d-flex justify-content-center pt-3"
				>
					<Stack gap={2}>
						<div className=" text-white">Follow Us :</div>
						<a
							href="https://www.instagram.com/rrons_rpo"
							className=" text-white text-decoration-none"
						>
							Instagram
						</a>
						<a
							href="https://www.facebook.com/RronsProducts"
							className=" text-white text-decoration-none"
						>
							Facebook
						</a>
						<a
							href="https://www.linkedin.com/company/99907026"
							className=" text-white text-decoration-none"
						>
							LinkedIn
						</a>
					</Stack>
				</Col>
				<Col
					md={2}
					className="d-flex justify-content-center pt-3"
				>
					<Stack gap={2}>
						<div className=" text-white">Ask Us Anything :</div>
						<div className=" text-white">FAQ</div>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;

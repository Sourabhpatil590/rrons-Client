import React from 'react';
import { Col, Row, Container, Stack } from 'react-bootstrap';
import './footer.scss';
import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { IoCallOutline } from 'react-icons/io5';
import { IoMailOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate();
	return (
		<Container
			fluid
			className="footer mt-5 p-0"
		>
			<Row
				md={12}
				className="footer-row"
			>
				<Col
					md={4}
					className="align-center-col left-col p-0"
				>
					<Stack className="">
						<div className="d-flex">
							<p className="pt-0">RRONS</p>
							<p className="pt-0 ps-0">WORKFORCE</p>
						</div>

						<p className="light-blue-text sub-title text">
							Recruitment Process Outsourcing & Placement Services
						</p>
						<div>
							<a
								href="https://www.facebook.com/RronsProducts"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/facebook.png"
									alt=""
								/>
							</a>

							<a
								href="https://www.instagram.com/rrons_rpo"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/insta.png"
									alt=""
								/>
							</a>

							<a
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/twitter.png"
									alt=""
									onClick={() => {
										navigate('/sign-in');
									}}
								/>
							</a>

							<a
								href="https://www.linkedin.com/company/99907026"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/linkedIn.png"
									alt="LinkedIn"
								/>
							</a>
							<a
								href="#"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/youtube.png"
									alt=""
								/>
							</a>
						</div>
					</Stack>
				</Col>

				<Col
					md={7}
					sm={12}
					className="right-col-footer"
				>
					{/* <Row
						md={12}
						className="justify-content-center"
					>
						<Col
							md="auto"
							className="text blue-text"
						>
							Help Center
						</Col>
						<Col
							md="auto"
							className="text blue-text"
						>
							About Us
						</Col>
						<Col
							md="auto"
							className="text blue-text"
						>
							Contact Us
						</Col>
						<Col
							md="auto"
							className="text blue-text"
						>
							FAQ
						</Col>
						<Col
							md="auto"
							className="text blue-text"
						>
							Terms and Conditions
						</Col>
						<Col
							md="auto"
							className="text blue-text"
						>
							Privacy Policies
						</Col>
					</Row> */}
					<hr />
					<Row md={12}>
						<Col>
							<p className="light-blue-text text text-center">
								If you are looking for any information, please
								feel free to contact us
							</p>
						</Col>
					</Row>
					<Row>
						<Col
							md={5}
							className="pb-2"
						>
							<CiLocationOn />
							<p className="pink-text text d-inline-block ps-3">
								Parbhani District Maharashtra
							</p>
							<div>
								<div>
									<IoCallOutline />
									<p className="pink-text text m-0 d-inline-block ps-3">
										+91 9021585790
									</p>
								</div>
								<div>
									<IoCallOutline />
									<p className="pink-text text m-0 d-inline-block ps-3">
										+91 7559219442
									</p>
								</div>
							</div>
						</Col>
						<Col
							md={7}
							className="pb-4"
						>
							<Row md={12}>
								<Col
									md={4}
									xs={4}
									className="blue-text text m-0 pe-0 d-inline-block"
								>
									For Clients:
								</Col>
								<Col xs={8}>
									<Row>
										{/* <Col >
											<IoMailOutline />
										</Col> */}
										<Col className="pink-text text m-0 d-inline-block ps-1 email">
											rrons.manpowersol@gmail.com
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col
									md={4}
									xs={4}
									className="blue-text text m-0 pe-0"
								>
									For Candidates:
								</Col>
								<Col>
									<Row>
										{/* <Col>
											<IoMailOutline />
										</Col> */}
										<Col className="pink-text text m-0 d-inline-block ps-1 email">
											hr.rrons@gmail.com
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col
									md={4}
									xs={4}
								>
									<p className="blue-text text m-0 pe-0">
										For help:
									</p>
								</Col>
								<Col>
									<Row>
										{/* <IoMailOutline /> */}
										<Col className="pink-text text m-0 d-inline-block ps-1 email">
											contact@rrons.in
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col
					className="align-center-col"
					md={1}
				>
					<a
						href="https://wa.me/9021585790"
						target="_blank"
						rel="noreferrer"
					>
						<img
							src="/whatsapp.png"
							alt=""
						/>
					</a>
				</Col>
			</Row>
			<Row className="trademark">
				<p className="blue-text m-0 d-inline-block">
					{' '}
					&#169; 2024 Rrons Workforce All rights reserved{' '}
				</p>
				{/* <p className="blue-text m-0 d">
					Designed by Madhu and Developed by Sourabh
				</p> */}
			</Row>
		</Container>
	);
};

export default Footer;

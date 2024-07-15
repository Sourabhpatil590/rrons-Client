import React from 'react';
import { Col, Row, Container, Stack } from 'react-bootstrap';
import './footer.scss';
import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { IoCallOutline } from 'react-icons/io5';
import { IoMailOutline } from 'react-icons/io5';

const Footer = () => {
	return (
		<Container
			fluid
			className="footer mt-5"
		>
			<Row
				md={12}
				className="footer-row"
			>
				<Col
					md={4}
					className="align-center-col left-col"
				>
					<Stack className="">
						<div>
							<p className="pt-0">RRONS</p>
							<p className="pt-0 ps-0">WORKFORCE</p>
						</div>

						<p className="light-blue-text sub-title text">
							Recruitment Process Outsourcing & Placement Services
						</p>
						<div>
							<img
								src="/facebook.png"
								alt=""
								href="https://www.facebook.com/RronsProducts"
							/>
							<img
								src="/insta.png"
								alt=""
								href="https://www.instagram.com/rrons_rpo"
							/>
							<img
								src="/twitter.png"
								alt=""
							/>
							<img
								src="/linkedIn.png"
								alt=""
								href="https://www.linkedin.com/company/99907026"
							/>
							<img
								src="/youtube.png"
								alt=""
							/>
						</div>
					</Stack>
				</Col>

				<Col
					md={7}
					className="right-col-footer"
				>
					<Row
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
					</Row>
					<hr />
					<Row md={12}>
						<p className="light-blue-text text text-center">
							If you are looking for any information, please feel
							free to contact us
						</p>
					</Row>
					<Row>
						<Col md={5}>
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
							md="auto"
							className=""
						>
							<p className="blue-text text m-0 pe-0">
								For Clients
							</p>
							<p className="blue-text text m-0 pe-0">
								For Candidates
							</p>
							<p className="blue-text text m-0 pe-0">For help</p>
						</Col>
						<Col
							md="auto"
							className="ps-0"
						>
							<div>
								<IoMailOutline />
								<p className="pink-text text m-0 d-inline-block ps-1">
									rrons.manpowersol@gmail.com
								</p>
							</div>

							<div>
								<IoMailOutline />
								<p className="pink-text text m-0 d-inline-block ps-1">
									hr.rrons@gmail.com
								</p>
							</div>
							<div>
								<IoMailOutline />
								<p className="pink-text text m-0 d-inline-block ps-1">
									contact@rrons.in
								</p>
							</div>
						</Col>
					</Row>
				</Col>
				<Col
					className="align-center-col"
					md={1}
				>
					<img
						src="/whatsapp.png"
						alt=""
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;

import React from 'react';
import { Row, Col, Container, Stack } from 'react-bootstrap';
import './subHeader.scss';
import Button from './../button/button';
import { CiLocationOn } from 'react-icons/ci';
import { PiLineVerticalThin, PiBriefcaseThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { JobSearchBar } from '../jobs/jobSearchBar';
import { useToken } from '../../serviceAPI/UtilityAPIs';

const SubHeader = () => {
	const navigate = useNavigate();
	const user = useToken();
	return (
		<Row
			md={12}
			className="sub-header"
		>
			<Col
				md={7}
				className="left-col-sub-header"
			>
				<Stack>
					<Col
						md={8}
						className="p-3"
					>
						<h1 className="subHeader-title">
							Find the perfect job for you{' '}
						</h1>
					</Col>
					<Col
						md={11}
						className="p-3"
					>
						<h4 className="subHeader-subTitle">
							Together, We can do so much. Search your career
							opportunity through 12,800 jobs
						</h4>
					</Col>
					<JobSearchBar />
					<Col className="pt-5 popular-clients d-flex justify-content-center">
						<p>Popular clients</p>
					</Col>
					<Row>
						<Col
							className="d-flex justify-content-center"
							md="auto"
						>
							<img
								src="/acme.png"
								alt="client"
								height="45px"
							/>
						</Col>
						<Col
							className="d-flex justify-content-center"
							md="auto"
						>
							<img
								src="/jenith.png"
								alt="client"
								height="45px"
							/>
						</Col>
						<Col
							className="d-flex justify-content-center"
							md="auto"
						>
							<img
								src="/triz.png"
								alt="client"
								height="45px"
							/>
						</Col>
						<Col
							className="d-flex justify-content-center p-1"
							md="auto"
						>
							<img
								src="/LDPharma.png"
								alt="client"
								height="45px"
							/>
						</Col>
					</Row>
				</Stack>
			</Col>
			{user ? (
				<Col
					md={5}
					className="right-col-sub-header"
				>
					<img
						src="/afterLogin.svg"
						alt=""
						width="100%"
					/>
				</Col>
			) : (
				<Col
					md={5}
					className="right-col-sub-header"
				>
					<div className="background-image">
						<div className="right-form">
							<Col>
								<h5>kickstart your career</h5>
							</Col>
							<Col>
								<p className="subHeader-subTitle light-blue-text">
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Proin risus nibh, ultricies
									et auctor.
								</p>
							</Col>
							<Col>
								<Button
									text="Register Now"
									onClick={() =>
										navigate('/register/?mode=viewProfile')
									}
								/>
							</Col>
							<Col>
								<Button
									className="mt-2 login-button"
									text="Login"
									onClick={() =>
										navigate('/login/?mode=viewProfile')
									}
								/>
							</Col>
						</div>
					</div>
					{/* <Col className="align-center-col medium-text">or</Col>
					<Col className="upload-file">
						<Col className="choose-cv">
							Choose your CV or drag it here
						</Col>
						<Col className="pink-text upload-local">
							Upload from local
						</Col>
					</Col> */}
				</Col>
			)}
		</Row>
	);
};

export default SubHeader;

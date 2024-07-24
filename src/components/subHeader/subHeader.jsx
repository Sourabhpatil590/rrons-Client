import React from 'react';
import { Row, Col, Container, Stack } from 'react-bootstrap';
import './subHeader.scss';
import Button from './../button/button';
import { CiLocationOn } from 'react-icons/ci';
import { PiLineVerticalThin, PiBriefcaseThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const SubHeader = () => {
	let locationList = [
		{ key: 'all', value: 'Location' },
		{ key: 'delhi', value: 'Delhi' },
		{ key: 'mumbai', value: 'Mumbai' },
		{ key: 'Parabhani', value: 'Parabhani' },
	];
	const navigate = useNavigate();
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
					<Col className="d-flex search-bar">
						<PiBriefcaseThin className="" />
						<input
							type="text"
							placeholder="Job title or Designation"
						/>
						{/* <p className="vertical-bar">|</p> */}
						<PiLineVerticalThin />
						<CiLocationOn className="" />
						<select name="location">
							{locationList.map((location) => (
								<option
									key={location.key}
									value={location.key}
								>
									{location.value}
								</option>
							))}
						</select>

						<div className="search-icon">
							<img
								src="/searchIcon.png"
								alt="search-icon"
								width="20px"
								// height="20px"
							/>
						</div>
						{/* </div> */}
					</Col>
					<Col className=" pt-5 popular-clients:">
						<p>Popular clients</p>
					</Col>
					<Row>
						<Col
							className=""
							md="auto"
						>
							<img
								src="/acme.png"
								alt="client"
								height="45px"
							/>
						</Col>
						<Col
							className=""
							md="auto"
						>
							<img
								src="/jenith.png"
								alt="client"
								height="45px"
							/>
						</Col>
						<Col
							className=""
							md="auto"
						>
							<img
								src="/triz.png"
								alt="client"
								height="45px"
							/>
						</Col>
						<Col
							className=""
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
								adipiscing elit. Proin risus nibh, ultricies et
								auctor.
							</p>
						</Col>
						<Col>
							<Button
								text="Register Now"
								onClick={() =>
									navigate(
										'/add-candidate-profile/?mode=viewProfile'
									)
								}
							/>
						</Col>
						<Col>
							<Button
								className="mt-2 login-button"
								text="Login"
								onClick={() =>
									navigate(
										'/candidate-login/?mode=viewProfile'
									)
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
		</Row>
	);
};

export default SubHeader;

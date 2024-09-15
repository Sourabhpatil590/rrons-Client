import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './header.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { PiLineVerticalThin } from 'react-icons/pi';
import Button from '../button/button';
import { useToken } from '../../serviceAPI/UtilityAPIs';

const Header = () => {
	const navigate = useNavigate();
	const user = useToken();
	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<Container
			fluid
			className="header p-0"
		>
			<Row
				className="header-row d-flex position-sticky"
				md={12}
				sm={12}
			>
				<Col className="d-flex">
					<Row>
						<Col md="auto">
							<p className="header-title-1">RRONS</p>
						</Col>
						<Col
							md="auto"
							className="ps-0"
						>
							<p className="header-title-2">WORKFORCE</p>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row>
						<Col
							md="auto"
							className="align-center-col"
						>
							<NavLink
								to="/"
								// className="header-subtitle active-link ps-3 pe-4"
								className={({ isActive }) =>
									isActive
										? 'header-subtitle active-link ps-3 pe-4'
										: 'header-subtitle ps-3 pe-4'
								}
							>
								Home
							</NavLink>
						</Col>
						<Col
							md="auto"
							className="align-center-col"
						>
							<NavLink
								to="/find-job"
								className={({ isActive }) =>
									isActive
										? 'header-subtitle active-link ps-3 pe-4'
										: 'header-subtitle ps-3 pe-4'
								}
							>
								All Jobs
							</NavLink>
						</Col>
						{/* <Col
							md="auto"
							className="align-center-col"
						>
							<NavLink
								to="/about-us"
								className={({ isActive }) =>
									isActive
										? 'header-subtitle active-link ps-3 pe-4'
										: 'header-subtitle ps-3 pe-4'
								}
							>
								More
							</NavLink>
						</Col> */}
					</Row>
				</Col>

				<Col className=" d-flex justify-content-end ">
					<Row className="d-flex">
						{user ? (
							<>
								<Col
									md="auto"
									className="align-center-col"
								>
									<Link
										to={`/candidate-profile/?id=${user.id}`}
										className="blue-text"
									>
										<CgProfile />
									</Link>
								</Col>
								<Col
									md="auto"
									className="align-center-col"
								>
									<PiLineVerticalThin />
								</Col>
								<Col>
									<Button
										className="login-button"
										text="Logout"
										onClick={handleLogout}
									/>
								</Col>
							</>
						) : (
							<>
								<Col>
									<Button
										className="login-button"
										text="Login"
										onClick={() => navigate('/login')}
									/>
								</Col>
								<Col>
									<Button
										className="register-button"
										text="Register"
										onClick={() =>
											navigate(
												'/register?mode=viewProfile'
											)
										}
									/>
								</Col>
							</>
						)}

						{/* <Col
						className="header-subtitle align-center-col pe-5"
						md="auto"
					>
						<Link
							to={'#'}
							className="text-decoration-none blue-text"
						>
							Employer's login
						</Link>
					</Col> */}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Header;

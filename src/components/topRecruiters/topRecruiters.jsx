import React from 'react';
import { Row, Col, Stack, Container } from 'react-bootstrap';
import './topRecruiters.scss';

const TopRecruiters = () => {
	const recruitersList = [
		{
			name: 'Acmeview',
			location: 'Parabhani',
			logo: '/acme.png',
		},
		{
			name: 'Jenith Techocast pvt ltd',
			location: 'Parabhani',
			logo: '/jenith.png',
		},
		{
			name: 'Triz',
			location: 'Parabhani',
			logo: '/triz.png',
		},
		{
			name: 'LR Pharmaceuticals',
			location: 'Parabhani',
			logo: '/LDPharma.png',
		},
		{
			name: 'kanad',
			location: 'Parabhani',
			logo: '/kanad.png',
		},
		// {
		// 	name: 'qubatic',
		// 	location: 'Parabhani',
		// 	logo: '/qubatic.png',
		// },
	];
	return (
		<Container
			fluid
			className="top-recruiters p-0"
		>
			<Row className="d-flex justify-content-center p-5">
				<Stack>
					<h2 className="text large-text blue-text text-center pb-3">
						Top Recruiters
					</h2>
					<p className="text text-400 light-blue-text text-center">
						Discover your next career move, freelance gig, or
						internship
					</p>
				</Stack>
			</Row>

			<Row
				md={12}
				className="d-flex justify-content-center pb-4"
			>
				{recruitersList.map((company) => (
					<Col
						md="auto"
						className="recruiter-item d-flex justify-content-center m-1"
						key={company.name}
					>
						<img
							src={company.logo}
							alt={company.name}
							className="recruiter-logo"
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default TopRecruiters;

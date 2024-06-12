import React, { useEffect, useState } from 'react';
import {
	Footer,
	Header,
	SubHeader,
	RecentJobs,
	WhyRrons,
} from '../../components';
import { Col, Row, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const categories = useSelector((state) => state.metaData.category);
	const navigate = useNavigate();
	return (
		<div>
			<Header />
			<SubHeader />
			{/* <Row md={12}>
				<Col md="auto">
					<img
						src="/workspace.webp"
						alt="logo"
						className="workspace-img"
					/>
				</Col>
			</Row> */}
			{/* <Row
				md={12}
				className="horizontal-block"
			></Row> */}
			<Row className="category d-flex justify-content-center">
				<Col md={10}>
					<Stack>
						<Row className="category-row">
							<h3>Find Your Next Job</h3>
							{categories.map((category) => (
								<Col
									md={3}
									key={category.key}
									className="category-item d-flex p-2"
									onClick={() => {
										navigate(
											'/find-job?category=' + category.key
										);
									}}
								>
									<h5>{category.value}</h5>
								</Col>
							))}
						</Row>
					</Stack>
				</Col>
			</Row>
			<RecentJobs />
			<WhyRrons />
			<Footer />
		</div>
	);
};

export default HomePage;

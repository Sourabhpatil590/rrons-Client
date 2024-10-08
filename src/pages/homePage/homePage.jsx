import React from 'react';
import {
	Footer,
	Header,
	SubHeader,
	RecentJobs,
	WhyRrons,
	Button,
	TopRecruiters,
	Testimonials,
} from '../../components';
import './homePage.scss';
import { Col, Stack, Row, Container } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categoryDropdownNew } from '../commonData/categoryDropdown';
import { useToken } from '../../serviceAPI/UtilityAPIs';

const HomePage = () => {
	const [index, setIndex] = useState(0);
	const navigate = useNavigate();
	const user = useToken();
	const len = categoryDropdownNew.length;
	let items = Math.floor(len / 10) + (len % 10 ? 1 : 0);
	let categoryArray = [];
	for (let i = 0; i < items; i++) {
		let start = i * 10;
		let end = start + 10;
		categoryArray.push(categoryDropdownNew.slice(start, end));
	}
	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};
	return (
		<Container
			fluid
			className="p-0"
		>
			<Header />
			<SubHeader />
			<Row className="category d-flex justify-content-center">
				<Col md={12}>
					<Stack>
						<h3 className="blue-text large-text">
							Browse by category
						</h3>
						<p className="medium-text light-blue-text text-center ">
							Find the job that’s perfect for you, about 800+ new
							jobs everyday
						</p>
						<Col className="category-row">
							<Carousel
								activeIndex={index}
								onSelect={handleSelect}
								controls={true}
								pause="hover"
								variant="dark"
								className="d-flex justify-content-center"
							>
								{categoryArray.map((arr) => (
									<Carousel.Item>
										{arr.map((category) => (
											<Col
												md={2}
												key={category.key}
												className="category-item p-1 m-1 d-inline-block"
												onClick={() => {
													navigate(
														'/find-job?category=' +
															category.key
													);
												}}
											>
												{/* <Col>
													<div>logo</div>
												</Col> */}
												<Stack>
													<p className="blue-text text text-600 m-0">
														{category.value}
													</p>
													{/* <p className="text item-subHeader text-200 m-0">
														No jobs available
													</p> */}
												</Stack>
											</Col>
										))}
									</Carousel.Item>
								))}
							</Carousel>
						</Col>
					</Stack>
				</Col>
			</Row>
			<Row
				className="we-are-hiring d-flex align-item-center justify-content-center"
				md={12}
				sm={12}
				xs={10}
			>
				<Col
					md={9}
					sm={11}
					xs={10}
					className="align-center-col"
				>
					<Row>
						<Col className="d-flex justify-content-center">
							<img src="/weAreHiring.png" />
						</Col>
						<Col>
							<Stack className="p-4">
								<h5 className="text blue-text text-600 text-center">
									Find the one that’s right for you!
								</h5>
								<p className="text light-blue-text text-400 text-center">
									Let’s work together and explore
									opportunities.
								</p>
							</Stack>
						</Col>
						<Col className="d-flex justify-content-center align-items-center">
							{!user ? (
								<Button
									text="Register Now"
									onClick={() =>
										navigate('/register/?mode=viewProfile')
									}
								/>
							) : (
								<Button
									text="See Jobs"
									onClick={() => navigate('/find-job')}
								/>
							)}
						</Col>
					</Row>
				</Col>
			</Row>
			<RecentJobs />
			<TopRecruiters />
			<WhyRrons />
			<Testimonials />
			<Footer />
		</Container>
	);
};

export default HomePage;

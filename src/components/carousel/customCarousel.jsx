import React from 'react';
import { Col, Stack, Row } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categoryDropdownNew } from '../../pages/commonData/categoryDropdown';

const CustomCarousel = (props) => {
	const [index, setIndex] = useState(0);
	const navigate = useNavigate();
	const len = categoryDropdownNew.length;
	console.log('array length', len);
	let items = Math.floor(len / 10) + (len % 10 ? 1 : 0);
	console.log('items', items);
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
		<Row className="category d-flex justify-content-center">
			<Col md={12}>
				<Stack>
					<h3 className="text-700 blue-text">Browse by category</h3>
					<p className="medium-text blue-text text-center ">
						Find the job that’s perfect for you, about 800+ new jobs
						everyday
					</p>
					<Col className="category-row">
						<Carousel
							activeIndex={index}
							onSelect={handleSelect}
							controls={true}
							pause="hover"
							variant="dark"
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
	);
};

export default CustomCarousel;

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';
import './testimonials.scss';

const Testimonials = () => {
	const [index, setIndex] = useState(0);
	const testimonials = [
		{
			company: 'ADM Join flex India Pvt Ltd',
			description:
				'Rrons Workforce is a reliable partner for any organisation seeking efficient and effective recruitment solutions. Their dedication, expertise, and customer-centric approach make them and invaluable asset',
			name: 'Prashant Kudale',
			position: 'Senior HR & IR Executive',
		},
		{
			company: 'Facebook',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla enim quis sapien accumsan, a varius ante vehicula. Ut sagittis quam at imperdiet imperdiet. Fusce accumsan eros id mi vulputate sagittis. Lorem ipsum do lordogg sit amet, consectetur adipiscing elit.',
			name: 'John Doe',
			position: 'Software Engineer',
		},
		{
			company: 'Microsoft',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla enim quis sapien accumsan, a varius ante vehicula. Ut sagittis quam at imperdiet imperdiet. Fusce accumsan eros id mi vulputate sagittis. Lorem ipsum do lordogg sit amet, consectetur adipiscing elit.',
			name: 'John Doe',
			position: 'Software Engineer',
		},
		{
			company: 'Dell',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla enim quis sapien accumsan, a varius ante vehicula. Ut sagittis quam at imperdiet imperdiet. Fusce accumsan eros id mi vulputate sagittis. Lorem ipsum do lordogg sit amet, consectetur adipiscing elit.',
			name: 'John Doe',
			position: 'Software Engineer',
		},
		{
			company: 'HP',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla enim quis sapien accumsan, a varius ante vehicula. Ut sagittis quam at imperdiet imperdiet. Fusce accumsan eros id mi vulputate sagittis. Lorem ipsum do lordogg sit amet, consectetur adipiscing elit.',
			name: 'John Doe',
			position: 'Software Engineer',
		},
		{
			company: 'Lenovo',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla enim quis sapien accumsan, a varius ante vehicula. Ut sagittis quam at imperdiet imperdiet. Fusce accumsan eros id mi vulputate sagittis. Lorem ipsum do lordogg sit amet, consectetur adipiscing elit.',
			name: 'John Doe',
			position: 'Software Engineer',
		},
	];
	const len = testimonials.length;
	let items = Math.floor(len / 3) + (len % 3 ? 1 : 0);
	let testimonialArray = [];
	for (let i = 0; i < items; i++) {
		let start = i * 3;
		let end = start + 3;
		testimonialArray.push(testimonials.slice(start, end));
	}

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<Row className="testimonial d-flex justify-content-center">
			<Col className="p-0">
				<Row>
					<Col>
						<h3 className="large-text text-center">Testimonial</h3>
					</Col>
				</Row>
				<Row className="testimonial-row">
					<Carousel
						activeIndex={index}
						onSelect={handleSelect}
						controls={true}
						pause="hover"
						variant="dark"
					>
						{testimonialArray.map((arr) => (
							<Carousel.Item>
								<Row>
									{arr.map((obj) => (
										<Col
											md={4}
											xs={12}
											className="testimonial-item p-2"
										>
											<p className="company text text-600 m-0 p-1">
												{obj.company}
											</p>
											<p className="description light-blue-text text text-300 m-0 p-1">
												{obj.description}
											</p>
											<p className="blue-text text text-600 m-0 p-1 pe-0 pb-0 pt-3">
												{obj.name}
											</p>
											<p className="position light-blue-text text text-300 m-0 p-1">
												{obj.position}
											</p>
										</Col>
									))}
								</Row>
							</Carousel.Item>
						))}
					</Carousel>
				</Row>
			</Col>
		</Row>
	);
};
export default Testimonials;

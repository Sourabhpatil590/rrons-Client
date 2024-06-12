import React from 'react';
import { Row, Col, Container, Stack } from 'react-bootstrap';

const SubHeader = () => {
	return (
		<Container
			fluid
			className="sub-header"
		>
			<Row
				md={12}
				className="d-flex justify-content-center"
			>
				{/* <Col md={1}></Col> */}
				<Col
					md={11}
					className="sub-header-text-box"
				>
					<Stack>
						<h1 className="sub-header-text-1">Together </h1>

						<h1 className="sub-header-text-2">
							We can do so much.
						</h1>
					</Stack>
				</Col>
				{/* <Col md={1}></Col> */}
			</Row>
		</Container>
	);
};

export default SubHeader;

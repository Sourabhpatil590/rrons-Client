import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { InfinitySpin, Bars } from 'react-loader-spinner';
import './loader.scss';

const Loader = () => {
	return (
		<Row
			md={12}
			className="d-flex justify-content-center align-items-center loader"
		>
			<Col
				md={12}
				className="d-flex justify-content-center align-items-center loader"
			>
				{/* <InfinitySpin
					visible={true}
					width="200"
					color="blue"
					ariaLabel="infinity-spin-loading"
				/> */}
				<Bars
					// height="80"
					width="200"
					color="#ff4181"
					ariaLabel="bars-loading"
					wrapperStyle={{}}
					wrapperClass="loader-component"
					visible={true}
				/>
			</Col>
		</Row>
	);
};

export default Loader;

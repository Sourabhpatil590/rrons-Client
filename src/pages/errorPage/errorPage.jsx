import React from 'react';
import { Container } from 'react-bootstrap';

const ErrorPage = (props) => {
	return (
		<Container>
			<text>Something went wrong</text>
			<p>
				{props.error && props.error.message
					? props.error.message
					: 'Error'}
			</p>
		</Container>
	);
};

export default ErrorPage;

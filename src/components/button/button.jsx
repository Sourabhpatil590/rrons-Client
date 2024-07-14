import React from 'react';
import './button.css';

const Button = (props) => {
	const { className, text, onClick } = props;
	const [loading, setLoading] = React.useState(false);

	const handleClick = async () => {
		setLoading(true);
		if (onClick) await onClick();
		setLoading(false);
	};

	return (
		<button
			onClick={handleClick}
			className={'pink-button ' + className}
			disabled={loading}
		>
			{loading ? <i className="fa fa-refresh fa-spin">loading</i> : text}
		</button>
	);
};

export default Button;

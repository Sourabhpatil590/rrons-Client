import React from 'react';
import { Col } from 'react-bootstrap';
import { CiLocationOn } from 'react-icons/ci';
import { PiBriefcaseThin, PiLineVerticalThin } from 'react-icons/pi';
import { cityNameData } from './cityNameData';

export const JobSearchBar = () => {
	return (
		<Col className="d-flex search-bar">
			<PiBriefcaseThin className="" />
			<input
				type="text"
				placeholder="Job title or Designation"
			/>
			<PiLineVerticalThin />
			<CiLocationOn className="" />
			<select name="location">
				{cityNameData.map((location) => (
					<option
						key={location.key}
						value={location.key}
					>
						{location.value}
					</option>
				))}
			</select>

			<div className="search-icon">
				<img
					src="/searchIcon.png"
					alt="search-icon"
					width="20px"
				/>
			</div>
		</Col>
	);
};

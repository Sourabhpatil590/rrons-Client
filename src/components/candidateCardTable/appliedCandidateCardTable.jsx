import React from 'react';
import Table from 'react-bootstrap/Table';
import { getService } from '../../serviceAPI/serviceAPI';
import Row from 'react-bootstrap/Row';
import { Button } from './../../components';
// import { CLoadingButton } from '@coreui/react-pro';

function AppliedCandidatesTable(props) {
	console.log(props);
	const [show, setShow] = React.useState(false);
	const [resume, setResume] = React.useState();
	const [loading, setLoading] = React.useState(false);

	const getCandidateResume = async (_id) => {
		// setLoading(true);
		const res = await getService(`/api/users/resume/${_id}`);
		console.log('resume response', res);
		const blob = new Blob([new Uint8Array(res?.data?.data?.data)], {
			type: 'application/pdf',
		});
		console.log('blob', blob);
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = 'resume.pdf';
		setResume(link);
		// setLoading(false);
		// link.click();
		setShow(true);
	};
	return (
		<>
			<Table
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>Sr.No.</th>
						<th>Name</th>
						<th>Email</th>
						<th>Contact</th>
						<th>Skills</th>
						<th>Education</th>
						<th>Experience</th>
						<th>Expected Salary</th>
						<th>Resume</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((candidate, index) => {
						return (
							<tr>
								<td>{index + 1}</td>
								<td>{candidate.name}</td>
								<td>{candidate.email}</td>
								<td>{candidate.contact}</td>
								<td>{candidate.skills}</td>
								<td>{candidate.education}</td>
								<td>{candidate.experience}</td>
								<td>{candidate.expectedSalary}</td>
								<td>
									{/* <CLoadingButton
										color="primary"
										onClick={() => {
											// setLoading(true);
											getCandidateResume(candidate._id);
										}}
										// timeout={2000}
										loading={false}
										// active="false"
										spinnerType="border"
										type="submit"
									>
										Submit
									</CLoadingButton> */}
									<Button
										onClick={() =>
											getCandidateResume(candidate._id)
										}
										// loading={loading}
										text="View Resume"
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{show && (
				<Row className="justify-center-row">
					{/* <Document file={{ data: resume }} /> */}
					<object
						width="100%"
						height="1000"
						data={resume}
						type="application/pdf"
					>
						{' '}
					</object>
					{/* <p>resume</p> */}
				</Row>
			)}
		</>
	);
}

export default AppliedCandidatesTable;

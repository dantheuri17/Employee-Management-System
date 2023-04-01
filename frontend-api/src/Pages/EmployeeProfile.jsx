import React, { useState, useEffect } from "react";

const EmployeeProfile = () => {
	const [data, setData] = useState({});
	const [receivedEmployeeData, setReceivedEmployeeData] = useState([]);
	const [submitted, setSubmitted] = useState(false);

	const serverHost = "http://localhost:4000";

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await fetch(serverHost + "/employees");
				let employeeData = await response.json();
				console.log(employeeData);
				setReceivedEmployeeData(employeeData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	async function addEmployee(employee) {
		const url = serverHost + "/addEmployee";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		};
		const response = await fetch(url, options);
		if (response.status === 200) {
			setSubmitted(true);
		}
	}

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		//create an object for the current input field event
		const currentInputFieldData = {
			[name]: value,
		};
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		setData(updatedData);
	};
	const handleSubmit = (e) => {
		console.log(data);
		addEmployee(data);
		e.preventDefault();
	};

	return (
		<div>
			<h1>This is the Employee Component</h1>
			{!submitted ? (
				<form onSubmit={handleSubmit}>
					<label>
						First name:
						<input name="firstName" type="text" onChange={handleChange} />
					</label>
					<br />
					<label>
						Middle name:
						<input name="middleName" type="text" onChange={handleChange} />
					</label>
					<br />
					<label>
						Last name:
						<input name="lastName" type="text" onChange={handleChange} />
					</label>
					<br />
					<input type="submit" value="submit" />
				</form>
			) : (
				receivedEmployeeData.map((employee) => {
					return (
						<div>
							<table>
								<thead>
									<tr>
										<th style={{ margin: 1.5 + 'em' }}>First Name</th>
										<th>Last Name</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style={{ margin: 1.5 + 'em' }}>{employee.firstName}</td>
										<td>{employee.lastName}</td>
									</tr>
								</tbody>
							</table>
						</div>
					);
				})
			)}
		</div>
	);
};

export default EmployeeProfile;

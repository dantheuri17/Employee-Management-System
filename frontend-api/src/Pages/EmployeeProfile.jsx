import React, { useState, useEffect } from "react";
import moment from "moment";
import "./EmployeeProfile.css";
import {
	PlusOutlined,
	ArrowLeftOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	InputNumber,
	Switch,
	Upload,
	Space,
	Table,
	Tag,
	Layout,
	Row,
	Col,
	Typography,
} from "antd";
import "./EmployeeProfile.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const EmployeeProfile = () => {
	const [data, setData] = useState({});
	const [receivedEmployeeData, setReceivedEmployeeData] = useState([]);
	const [submitted, setSubmitted] = useState(false);
	const [isManager, setIsManager] = useState(false);
	const [showAddEmployee, setShowAddEmployee] = useState(false);
	const [showEditEmployee, setShowEditEmployee] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [formstate, setFormstate] = useState(false);
	const [editData, setEditData] = useState(false);

	const serverHost = "https://employee-management-system-tuf7.onrender.com";

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

	useEffect(() => {
		// if (editData && selectedEmployee) {
		// 	setData({
		// 		isManager: selectedEmployee.isManager,
		// 		employeeName: selectedEmployee.employeeName,
		// 		employeeEmail: selectedEmployee.employeeEmail,
		// 		phoneNumber: selectedEmployee.phoneNumber,
		// 		employeeStatus: selectedEmployee.employeeStatus,
		// 		dateJoined: selectedEmployee.dateJoined,
		// 		position: selectedEmployee.position,
		// 		employementType: selectedEmployee.employementType,
		// 		workType: selectedEmployee.workType,
		// 		department: selectedEmployee.department,
		// 		manager: selectedEmployee.manager
		// 	});
		//   }
		fetchData();
	}, [receivedEmployeeData]);

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

async function updateEmployee(employeeID, updatedFields) {
	try {
		const url = `${serverHost}/updateEmployee/${employeeID}`;
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedFields),
		};
		console.log("Updated Employee", options.body);
		const response = await fetch(url, options);
		if (response.status === 200) {
			// setSubmitted(true);
		} else {
			// handle error
			console.error(`Error: ${response.statusText}`);
		}
	} catch (error) {
		// handle error
		console.error(error);
	}
}


	async function deleteEmployee(employeeID) {
		const url = `${serverHost}/deleteEmployee/${employeeID}`;
		const options = {
			method: "DELETE",
		};
		const response = await fetch(url, options);
		if (response.status === 200) {
			fetchData();
		}
	}

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		const currentInputFieldData = {
			[name]: value,
		};
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		console.log("Updated Data", updatedData);

		setData(updatedData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await addEmployee(data);
		fetchData();
		setShowAddEmployee(false);
	};

	const handleSaveChanges = async (e) => {
		e.preventDefault();
		// await updateEmployee(selectedEmployee._id, data);
		updateEmployee(selectedEmployee.employeeID, data);
		console.log(`In save changes ${selectedEmployee.employeeID}`, data);
		fetchData();
		setEditData(false);
		console.log("Received employee data", receivedEmployeeData);

		const updatedEmployee = data; 
		console.log("Updated Employee", data);

		const employeeID = selectedEmployee.employeeID; 
		const updatedEmployeeData = receivedEmployeeData.map((employee) => {
		if (employee.employeeID === employeeID) {
			console.log("ID matched")
			console.log("Full updated data", {...employee, ...updatedEmployee})
			return { ...employee, ...updatedEmployee }; // Spread the existing employee object and the updated data
		}
		return employee; // Return the original employee object for all other cases
		});
		console.log("Updated Data outside", updatedEmployeeData)
		setReceivedEmployeeData(updatedEmployeeData);
		console.log("prop change", receivedEmployeeData);
		handleHideEditEmployee();

	};

	// HANDLING FORM INPUTS
	const handleCalendar = (mydate, myname) => {
		console.log("Value in date", mydate);
		console.log("value in name", myname);
		const name = myname;
		const value = mydate;
		const currentInputFieldData = {
			[name]: value,
		};
		console.log("Current Input Field", currentInputFieldData);
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		console.log("Updated Data", updatedData);
		setData(updatedData);
	};

	const handleSelect = (status, selectName) => {
		console.log("Value in status", status);
		console.log("Value in select name", selectName);

		const name = selectName;
		const value = status;
		const currentInputFieldData = {
			[name]: value,
		};
		console.log("Current Input Field", currentInputFieldData);
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		console.log("Updated Data", updatedData);

		setData(updatedData);

		// if(selectName === "department"){
		// 	updateManagerOptions(value);
		// }
	};


	const handleHideAddEmployee = () => {
		setShowAddEmployee(false);
	};

	const handleShowAddEmployee = () => {
		console.log("handleShowAddEmployee called");
		setShowAddEmployee(true);
	};

	const handleEmployeeClick = (record) => {
		console.log("record", record)
		setShowEditEmployee(true);
		setSelectedEmployee(record);
		console.log(`EmployeeID = ${record.employeeID}`);
		setFormstate(true);
	};

	const handleHideEditEmployee = () => {
		setFormstate(false);
		setShowEditEmployee(false);
		
	};

	const handleEditEmployee = (e) => {
		setFormstate(false);
		e.preventDefault();
	};

	const tableColumns = [
		{
			title: "Name",
			dataIndex: "employeeName",
			key: "employeeName",
		},
		{
			title: "Email Address",
			dataIndex: "employeeEmail",
			key: "employeeEmail",
		},
		{
			title: "Department",
			dataIndex: "department",
			key: "department",
		},
		{
			title: "Position",
			dataIndex: "position",
			key: "position",
		},
		{
			title: "",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<a onClick={() => deleteEmployee(record.employeeID)}>Delete</a>
				</Space>
			),
		},
	];


	return (
		<div id="pagediv">
			{!showAddEmployee && !showEditEmployee ? (
				<div>
					<button onClick={handleShowAddEmployee}>Add Employee</button>
					<Table
						columns={tableColumns}
						dataSource={receivedEmployeeData}
						rowKey="employeeID"
						onRow={(record, rowIndex) => {
							return {
								onClick: () => handleEmployeeClick(record),
							};
						}}
					/>
				</div>
			) : (
				<Layout
					style={{
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						backgroundColor: "white",
						width: "90vw",
						margin: "auto",
					}}
				>
					<Header
						style={{
							backgroundColor: "white",
							borderBottom: "1px solid lightgrey",
							paddingLeft: "0em",
							paddingRight: "0em",
							marginTop: "2em",
						}}
					>
						<Row justify="space-between" align="middle">
							<Col>
								<Space>
									<ArrowLeftOutlined
										style={{ fontSize: "24px", marginRight: "1em" }}
										onClick={() => {
											if (showEditEmployee) {
												handleHideEditEmployee();
											} else {
												handleHideAddEmployee();
											}
										}}
									/>
									<Title level={2}>Employee Details</Title>
								</Space>
							</Col>
						</Row>
					</Header>
					<form onSubmit={handleSubmit}>
						<Content>
							<div id="contentdiv">
								<Row gutter={[100, 100]}>
									<Col span={8}>
										<div>
											<img
												src={require("./passport.png")}
												alt="Employee"
												width={400}
												height={400}
											/>
										</div>
									</Col>
									<Col span={8}>
										<Title level={4}>GENERAL DETAILS</Title>
										<Form.Item name="employeeName" rules={[{ required: true }]}>
											<label>
												Employee Name
												<Input
												 name="employeeName"
												 onChange={handleChange}
												 disabled={formstate}
												 defaultValue={showEditEmployee ? selectedEmployee.employeeName : undefined}
												 />
											</label>
											<br />
										</Form.Item>

										<Form.Item
											name="employeeEmail"
											rules={[{ required: true, type: "email" }]}
										>
											<label>
												Email
												<Input 
												name="employeeEmail" 
												onChange={handleChange} 
												disabled={formstate}
												defaultValue={showEditEmployee ? selectedEmployee.employeeEmail : undefined}
												/>
											</label>
											<br />
										</Form.Item>
										<Form.Item name="phoneNumber" rules={[{ required: true }]}>
											<label>
												Phone Number
												<Input name="phoneNumber"
												 onChange={handleChange}
												  disabled={formstate}
												  defaultValue={showEditEmployee ? selectedEmployee.phoneNumber: undefined}
												  />
											</label>
										</Form.Item>
										<Title level={4}>EMPLOYMENT DETAILS</Title>
										<Form.Item
											name="employeeStatus"
											rules={[{ required: true }]}
										>
											<label>
												Employee Status
												<Select
													name="employeeStatus"
													disabled={formstate}
													onChange={(status) =>
														handleSelect(status, "employeeStatus")
													}
									
													defaultValue={showEditEmployee ? selectedEmployee.employeeStatus : undefined}

												>
													<Select.Option value="Employed">
														Employed
													</Select.Option>
													<Select.Option value="Fired">Fired</Select.Option>
													<Select.Option value="Resigned">
														Resigned
													</Select.Option>
												</Select>
											</label>
										</Form.Item>
										<Form.Item name="dateJoined" rules={[{ required: true }]}>
											<label>
												Date Joined
												<DatePicker
													name="dateJoined"
													disabled={formstate}
													onChange={(date) =>
														handleCalendar(date, "dateJoined")
													}
													defaultValue={showEditEmployee? moment(selectedEmployee.dateJoined): null}
													  />
											</label>
										</Form.Item>
									</Col>
									<Col span={8}>
										<Title level={4}>ROLE DETAILS</Title>

										<Form.Item name="position" rules={[{ required: true }]}>
											<label>
												Position
												<Input name="position"
												 onChange={handleChange}
												  disabled={formstate}
												  defaultValue={showEditEmployee ? selectedEmployee.position : undefined}
												  />
											</label>
											<br />
										</Form.Item>

										<Form.Item
											name="employementType"
											rules={[{ required: true }]}
										>
											<label>
												Employement Type
												<Select
													name="employementType"
													disabled={formstate}
													onChange={(status) =>
														handleSelect(status, "employementType")
													}
													defaultValue={showEditEmployee ? selectedEmployee.employementType : undefined}

												>
													<Select.Option value="Fulltime">
														Full Time
													</Select.Option>
													<Select.Option value="Parttime">
														Part Time
													</Select.Option>
													<Select.Option value="Intern">Intern</Select.Option>
												</Select>
											</label>
										</Form.Item>

										<Form.Item name="workType" rules={[{ required: true }]}>
											<label>
												Work Type
												<Select
													name="workType"
													disabled={formstate}
													onChange={(status) =>
														handleSelect(status, "workType")
													}
													defaultValue={showEditEmployee ? selectedEmployee.workType : undefined}

												>
													<Select.Option value="On-site">On-site</Select.Option>
													<Select.Option value="Remote">Remote</Select.Option>
													<Select.Option value="Hybrid">Hybrid</Select.Option>
												</Select>
											</label>
										</Form.Item>

										<Form.Item name="department" rules={[{ required: true }]}>
											<label>
												Department
												<Select
													name="department"
													disabled={formstate}
													id="department"
													onChange={(status) =>
														handleSelect(status, "department")
													}
													defaultValue={showEditEmployee ? selectedEmployee.department : undefined}

												>
													<Select.Option value="IT">IT</Select.Option>
													<Select.Option value="Finance">Finance</Select.Option>
													<Select.Option value="Human Resource">
														Human Resource
													</Select.Option>
													<Select.Option value="Sales">Sales</Select.Option>
													<Select.Option value="Marketing">
														Marketing
													</Select.Option>
													<Select.Option value="Research and Development">
														Research and Development
													</Select.Option>
												</Select>
											</label>
										</Form.Item>

										<Form.Item name="manager" rules={[{ required: true }]}>
											<label>
												Manager
												<Select
													name="manager"
													disabled={formstate}
													id="manager"
													onChange={(status) => handleSelect(status, "manager")}
													defaultValue={showEditEmployee ? selectedEmployee.manager : undefined}

												>
													<Select.Option value="Irene">Irene</Select.Option>
													<Select.Option value="Jane">Jane</Select.Option>
													<Select.Option value="Mark">Mark</Select.Option>
												</Select>
											</label>
										</Form.Item>
							
									</Col>
								</Row>
							</div>
						</Content>
						<Footer
							style={{
								backgroundColor: "white",
								paddingLeft: "0em",
								paddingRight: "0em",
								position: "absolute",
								bottom: "1em",
								display: "flex",
								gap: "2em",
							}}
						>
							{!formstate ? (
								showEditEmployee ? (
									<Button
										type="primary"
										htmlType="button"
										style={{
											backgroundColor: "black",
											width: "300px",
											height: "auto",
											fontSize: "1.5em",
										}}
										onClick={handleSaveChanges}
									>
										{" "}
										Save Changes
									</Button>
								) : (
									<Button
										type="primary"
										htmlType="submit"
										style={{
											backgroundColor: "black",
											width: "300px",
											height: "auto",
											fontSize: "1.5em",
										}}
									>
										{" "}
										Submit
									</Button>
								)
							) : (
								<Button
									type="primary"
									htmlType="button"
									style={{
										backgroundColor: "black",
										width: "300px",
										height: "auto",
										fontSize: "1.5em",
									}}
									onClick={handleEditEmployee}
								>
									{" "}
									Edit
								</Button>
							)}

							<Button
								type="primary"
								style={{
									backgroundColor: "#CDCDCD",
									width: "300px",
									height: "auto",
									fontSize: "1.5em",
									color: "black",
								}}
								onClick={() => {
									if (showEditEmployee) {
										handleHideEditEmployee();
									} else {
										handleHideAddEmployee();
									}
								}}
							>
								Cancel
							</Button>
						</Footer>
					</form>
				</Layout>
			)}
		</div>
	);
};

export default EmployeeProfile;

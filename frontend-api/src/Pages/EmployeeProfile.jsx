import React, { useState, useEffect } from "react";
import moment from 'moment';
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
	const [data, setData] = useState({
		isManager:false
	});
	const [receivedEmployeeData, setReceivedEmployeeData] = useState([]);
	const [submitted, setSubmitted] = useState(false);
	const [isManager, setIsManager] = useState(false);
	const [showAddEmployee, setShowAddEmployee] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [formstate, setFormstate] = useState(false);
	const [editData, setEditData] = useState(false);





	const serverHost = "http://localhost:4000";

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
		console.log("Value in e", e);
		console.log("E value", e.target.name);
		console.log("E value", e.target.value);

		const name = e.target.name;
		const value = e.target.value;
		console.log("E name", e.target.name);
		console.log("E value", e.target.value);

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

	function updateManagerOptions(selectedDepartment) {
		const myData = receivedEmployeeData;
		console.log("MY DATA", myData);
		console.log("Slected Dep", selectedDepartment);
		const managersInDepartment = myData.filter(
			(employee) =>
				employee.isManager === true &&
				employee.department === selectedDepartment
		);
		console.log("Managers in Deparment", managersInDepartment);
		const managerDropdown = document.getElementById("manager");

		// Clear existing options
		if (managerDropdown.options) {
			var i,
				L = managerDropdown.options.length - 1;
			for (i = L; i >= 0; i--) {
				managerDropdown.remove(i);
			}
			console.log("Just cleared manager dropdown");
		}

		// Add new options
		managersInDepartment.forEach((manager) => {
			console.log("Inside For each");
			console.log("Manager", manager);
			const option = document.createElement("option");
			option.value = manager.employeeName;
			option.text = manager.employeeName;
			managerDropdown.appendChild(option);
		});
	}

	// HANDLING FORM INPUTS
	const handleCalendar = (mydate, myname) => {
		console.log("Value in date", mydate);
		console.log("value in name", myname);
		const name = myname;
		const value= mydate;
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

	const handleSwitch = (checked) => {
		setIsManager(checked);
		console.log("Checked", checked)
		const currentInputFieldData = {}
		if (checked || typeof checked === 'boolean') {
			currentInputFieldData.isManager = checked;
			console.log("currentinputfielddata", currentInputFieldData)

		  } else {
			currentInputFieldData.isManager = false;
			console.log("currentinputfielddata", currentInputFieldData)

		  }
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		setData(updatedData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await addEmployee(data);
		fetchData();
		setShowAddEmployee(false);
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
		setSelectedEmployee(record);
		setFormstate(true);
		setEditData(true);
	  };

	const handleEditEmployee = (e) => {
		setFormstate(false); 
		e.preventDefault();
	  }

	const handleSaveChanges = (e) => {
		e.preventDefault();
		console.log("In save changes");

	  }

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

	console.log("showAddEmployee:", showAddEmployee);

	return (
		<div id="pagediv">
			{!showAddEmployee && !selectedEmployee ? (
				<div>
					<button onClick={handleShowAddEmployee}>Add Employee</button>
					<Table
						columns={tableColumns}
						dataSource={receivedEmployeeData}
						rowKey="employeeID"
						onRow={(record, rowIndex) => {
						  return {
							onClick: () =>  handleEmployeeClick(record),
						  };
						}}
					/>
				</div>
			):(
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
										onClick={handleHideAddEmployee}
									/>
									<Title level={2}>Employee Name</Title>
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
												 defaultValue={editData ? selectedEmployee.employeeName : undefined}
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
												defaultValue={editData ? selectedEmployee.employeeEmail : undefined}
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
												  defaultValue={editData ? selectedEmployee.phoneNumber: undefined}
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
									
													defaultValue={editData ? selectedEmployee.employeeStatus : undefined}

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
													defaultValue={editData? moment(selectedEmployee.dateJoined): null}
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
												  defaultValue={editData ? selectedEmployee.position : undefined}
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
													defaultValue={editData ? selectedEmployee.employementType : undefined}

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
													defaultValue={editData ? selectedEmployee.workType : undefined}

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
													defaultValue={editData ? selectedEmployee.department : undefined}

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
													defaultValue={editData ? selectedEmployee.manager : undefined}

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
								gap: "2em"
						
							}}
						>
						{!formstate ? (
							editData ? (
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
								> Save Changes
							</Button>
								

							):(
								<Button
								type="primary"
								htmlType="submit"
								style={{
									backgroundColor: "black",
									width: "300px",
									height: "auto",
									fontSize: "1.5em",
								}}
								> Submit
							</Button>
							)
						):(
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
								> Edit
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
								onClick={handleHideAddEmployee}
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

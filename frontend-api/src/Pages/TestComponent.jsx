import React, { useState, useEffect } from "react";

const TestComponent = () => {

    const [receivedEmployeeData, setReceivedEmployeeData] = useState([]);

    const serverHost = "http://localhost:4000";

		useEffect(() => {
			const fetchData = async () => {
				try {
					let response = await fetch(serverHost + "/getEmployees");
					let employeeData = await response.json();
					console.log(employeeData);
					setReceivedEmployeeData(employeeData);
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}, []);

	return (
		<div>
			{receivedEmployeeData.map((element) => {
                return (
                    <div>
                        <h2>{element.firstName}</h2>
                        <h2>{element.lastName}</h2>
                    </div>
                )
            })}
		</div>
	);
};

export default TestComponent;

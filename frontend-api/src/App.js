import { DatePicker, Space } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import EmployeeProfile from "./Pages/EmployeeProfile";

const onChange = (date, dateString) => {
	console.log(date, dateString);
};

function App() {
	return (
		<EmployeeProfile />
	);
}

export default App;

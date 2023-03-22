import { DatePicker, Space } from "antd";
import "antd/dist/reset.css";
import "./App.css";

const onChange = (date, dateString) => {
	console.log(date, dateString);
};

function App() {
	return (
		<Space direction="vertical">
			<DatePicker onChange={onChange} />
			<DatePicker onChange={onChange} picker="week" />
			<DatePicker onChange={onChange} picker="month" />
			<DatePicker onChange={onChange} picker="quarter" />
			<DatePicker onChange={onChange} picker="year" />
		</Space>
	);
}

export default App;

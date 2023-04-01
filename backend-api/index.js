const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 4000;
const jsonParser = express.json();
const fileName = "employees.json";

// Allow requests only from this client
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

// Load employeeData from file
let rawData = fs.readFileSync(fileName);
let employeeData = JSON.parse(rawData);

// This is a RESTful GET web service
// app.get("/employees", (request, response) => {
// 	employeeData.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
	
// });

app.get('/employees', (req, res) => {
	res.json(employeeData)
	console.log(employeeData)
	
})

// This is a RESTful POST web service
app.post("/addEmployee", jsonParser, (request, response) => {
	employeeData.push(request.body);
	fs.writeFileSync(fileName, JSON.stringify(employeeData, null, 2));
	response.send(employeeData);
	
});

app.post("/deleteEmployee")

app.listen(port);
console.log(`server listening on port ${port}`);

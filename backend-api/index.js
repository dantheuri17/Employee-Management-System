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
app.get("/employees", (request, response) => {
	employeeData.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
	response.send(employeeData);
});

app.get('/getEmployees', (req, res) => {
	console.log(res.json(employeeData))
	
})

// This is a RESTful POST web service
app.post("/employees", jsonParser, (request, response) => {
	employeeData.push(request.body);
	fs.writeFileSync(fileName, JSON.stringify(employeeData, null, 2));
	
});

app.listen(port);
console.log(`server listening on port ${port}`);

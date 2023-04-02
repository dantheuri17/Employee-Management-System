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

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

// This is a RESTful GET web service
app.get("/employees", (request, response) => {
	data.sort((a, b) => (a.name > b.name ? 1 : -1));
	response.send(data);
});

// This is a RESTful POST web service
app.post("/employees", jsonParser, (request, response) => {
	data.push(request.body);
	fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
	response.end();
});

app.listen(port);
console.log(`server listening on port ${port}`);

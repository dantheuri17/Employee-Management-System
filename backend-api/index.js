const cors = require('cors');
const express = require('express');
const app = express();
const employees = require('./employees.json');

// Allow requests only from this client
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});

const xlsx = require('xlsx');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Load Excel file and parse it
const workbook = xlsx.readFile('Grades.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const grades = xlsx.utils.sheet_to_json(sheet); // array of { ID, Name, Grade }

app.get('/grade/:id', (req, res) => {
  const student = grades.find(s => s.ID == req.params.id);
  if (student) {
    res.send(`Hi ${student.Name}, your grade is ${student.Grade}`);
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

let grades = [];

// Check if Grades.xlsx exists
if (fs.existsSync('Grades.xlsx')) {
  const workbook = xlsx.readFile('Grades.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  grades = xlsx.utils.sheet_to_json(sheet);
  console.log(`✅ Grades.xlsx loaded with ${grades.length} students`);
} else {
  console.log('❌ Grades.xlsx not found');
}

// Route to get grade by ID
app.get('/grade/:id', (req, res) => {
  const student = grades.find(s => String(s.ID) === req.params.id);
  if (student) {
    res.send(`Hi ${student.Name}, your grade is ${student.Grade}`);
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5050;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only accept JSON files
    if (file.mimetype === 'application/json' || path.extname(file.originalname) === '.json') {
      cb(null, true);
    } else {
      cb(new Error('Only JSON files are allowed'));
    }
  }
});

// Landing page - auto-redirects to POST /
app.get('/', (req, res) => {
  res.send(`
    <html><body>
      <form id="f" method="POST" action="/"></form>
      <script>document.getElementById('f').submit();</script>
    </body></html>
  `);
});

// POST route - show the upload form
app.post('/', (req, res) => {
  res.render('index');
});

// POST route - receive file, decrypt (parse) JSON, and show table
app.post('/upload', upload.single('jsonfile'), (req, res) => {
  if (!req.file) {
    return res.render('index', { error: 'No file uploaded. Please select a JSON file.' });
  }

  const filePath = req.file.path;

  // Read and decrypt (parse) the JSON file on the server
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  // Normalize to array so table rendering works for both objects and arrays
  const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

  // Extract column headers from the keys
  const headers = Object.keys(dataArray[0]);

  // Clean up the uploaded file after reading
  fs.unlinkSync(filePath);

  // Render the table view with the decrypted data
  res.render('table', { headers, data: dataArray, filename: req.file.originalname });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

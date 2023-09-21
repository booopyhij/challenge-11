// imports the express package

const express = require('express');
// requires the routes for pulling the page
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/routes.js');

// Const that has the server port 
const PORT = process.env.port || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/public/notes.html', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// how the server starts
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

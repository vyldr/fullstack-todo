const http = require('http');
const express = require('express');

// Set the port
const PORT = process.env.PORT || 3001;

// Create the server
const app = express();
const httpServer = http.createServer(app);

// Serve endpoints

// Placeholder endpoint returns current time
app.get('/api', (req, res) => {
	res.send(JSON.stringify((new Date()).getTime()));
	console.log('/api');
});

// Serve static files from a directory
app.use(express.static('./public'));

// Start the server
httpServer.listen(PORT, () => {
	console.log('Server listening on: ' + PORT);
});

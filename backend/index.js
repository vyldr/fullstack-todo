const http = require('http');
const express = require('express');

// Set the port
const PORT = process.env.PORT || 3001;

// Create the server
const app = express();
const httpServer = http.createServer(app);

// Set up the database
const { Client } = require('pg');
const database = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
database.connect();

// Serve endpoints

// Get all items
app.get('/api/todos', (req, res) => {
    var query = 'SELECT * FROM todos;';
    var values = [];

    database.query(query, values, (err, dbres) => {
        if (err) {
            console.log(err.stack);
            return res.status(500).send();
        } else {
            // console.log(dbres);
            return res.status(200).send(dbres.rows);
        }
    });
})


// Serve static files from a directory
app.use(express.static('./public'));

// Start the server
httpServer.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

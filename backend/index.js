const http = require('http');
const express = require('express');
var bodyParser = require('body-parser');

// Set the port
const PORT = process.env.PORT || 3001;

// Create the server
const app = express();
const httpServer = http.createServer(app);
app.use(bodyParser.json());

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
});

// Add a new item
app.get('/api/addItem', (req, res) => {
    var query = "INSERT INTO todos (checked, content) values ('f', '');";
    var values = [];

    database.query(query, values, (err) => {
        if (err) {
            console.log(err.stack);
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    });
});

// Delete an item
app.delete('/api/deleteItem', (req, res) => {
    var query = 'DELETE FROM todos WHERE item_id = $1;';
    var values = [req.body.id];

    console.log('Deleting ' + req.body.id);

    database.query(query, values, (err) => {
        if (err) {
            console.log(err.stack);
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    });
});

// Update an item
app.post('/api/saveItem', (req, res) => {
    var query = 'UPDATE todos SET content = $1 WHERE item_id = $2;';
    var values = [req.body.content, req.body.id];

    database.query(query, values, (err) => {
        if (err) {
            console.log(err.stack);
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    });
});

// Toggle a checkbox
app.post('/api/checkItem', (req, res) => {
    var query = 'UPDATE todos SET checked = NOT checked WHERE item_id = $1;';
    var values = [req.body.id];

    database.query(query, values, (err) => {
        if (err) {
            console.log(err.stack);
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    });
});


// Serve static files from a directory
app.use(express.static('./public'));

// Start the server
httpServer.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

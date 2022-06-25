const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
    host: 'mysql-container',
    user: 'root',
    database: 'challengedb',
    password: 'admin'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar:', err)
    }
});

app.get('/hello', (_req, res) => res.send('Hello World!')); // test

app.get('/test-connection', (_req, res) => { // testing db connection
    connection.query('SELECT version()', (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
    });
});

app.listen(9001, '0.0.0.0', () => console.log('Listening on port 9001'));
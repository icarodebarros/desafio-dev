const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((_req, res, next) => { // Avoid CORS policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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

/**
 * Get all the financil movements
 */
app.get('/transactions', (_req, res) => {
    connection.query('SELECT * FROM cnab', (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
    });
});

/**
 * Save a list of financial movements
 */
app.post('/transactions', (req, res) => {
    const list = req.body;

    const sql = 'INSERT INTO cnab (type, datetime, value, cpf, card, ownerName, storeName) VALUES ';
    const values = list.map((item) => {
        const dtNorm = item.datetime.replace('T', ' ').substring(0, 19);
        return `(${item.type}, '${dtNorm}', ${item.value}, ${item.cpf}, '${item.card}', '${item.ownerName}', '${item.storeName}')`
    });
    const query = sql + values + ';';

    connection.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send({ 
            message: 'Records saved successfully',
            info: results.info
        });
    });
});

app.listen(9001, '0.0.0.0', () => console.log('Listening on port 9001'));
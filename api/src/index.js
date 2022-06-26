const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const FinancialMovement = require('./models/financialMovement');

const testRoutes = require('./routes/test');
const transactionRoutes = require('./routes/transaction');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((_req, res, next) => { // Avoid CORS policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/test', testRoutes);
app.use('/transactions', transactionRoutes);

sequelize
    .sync()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(
            9001, 
            '0.0.0.0', 
            () => console.log('Listening on port 9001')
        );
    })
    .catch(() => {
        console.error('Unable to connect to the database:', error);
    });

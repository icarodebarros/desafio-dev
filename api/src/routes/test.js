const express = require('express');
const sequelize = require('../utils/database');

const router = express.Router();

router.get('/api', (_req, res) => res.send('Hello World!'));

router.get('/db', async (_req, res, _next) => {
    try {
        const [results, _metadata] = await sequelize.query('SELECT version()');
        res.status(200).send(`Connected with mysql. ${JSON.stringify(results[0])}`);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;
const express = require('express');
const sequelize = require('../utils/database');

const router = express.Router();

/**
 * Test if API is running
 */
router.get('/api', (_req, res) => res.send('Hello World!'));

/**
 * Test if DB is connected
 */
router.get('/db', async (_req, res, _next) => {
    try {
        const [results, _metadata] = await sequelize.query('SELECT version()');
        res.status(200).send(`Connected with mysql. ${JSON.stringify(results[0])}`);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;
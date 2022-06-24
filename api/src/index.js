const express = require('express');

const app = express();

app.get('/hello', (_req, res) => res.send('Hello World!')); // test

app.listen(9001, '0.0.0.0', () => console.log('Listening on port 9001'));
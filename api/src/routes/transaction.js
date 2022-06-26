const express = require('express');
const transactionController = require('../controllers/transaction');

const router = express.Router();

router.get('', transactionController.getAllTransactions);

router.post('', transactionController.postListTransactions);


module.exports = router;
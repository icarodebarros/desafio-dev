const FinancialMovement = require('../models/financialMovement');

/**
 * List all the financial movements
 */
exports.getAllTransactions = async (_req, res, _next) => {
  try {
    const transactions = await FinancialMovement.findAll();
    res.status(200).send(transactions);
  } catch(err) {
    res.status(500).send('Something went wrong');
  }
};

/**
 * Save a list of financial movements
 */
exports.postListTransactions = async (req, res, _next) => {
  const list = req.body;

  console.log('list', list)

  try {
    const result = await FinancialMovement.bulkCreate(list);
    res.status(200).send({ 
      message: 'Records saved successfully',
      info: `Rows affected: ${result.length}`
    });
  } catch(err) {
    res.status(500).send({ 
      message: 'Error saving data',
      info: err
    });
  }
};
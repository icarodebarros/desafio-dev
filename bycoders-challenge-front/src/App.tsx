import { useState } from 'react';
import './App.css';
import TransactionsList from './components/TransactionsList';
import Upload from './components/Upload';
import { FinancialMovement } from './models/financialMovement';

function App() {
  const [transactions, setTransactions] = useState<FinancialMovement[]>([]);

  return (
    <div className="App">
      <p>ByCodersTec / desafio-dev</p>

      <div className='form-container card'>
        <Upload onSetTransactions={setTransactions}></Upload>
      </div>

      {!!transactions.length && (
        <TransactionsList transactions={transactions}></TransactionsList>
      )}

    </div>   
  );
}

export default App;

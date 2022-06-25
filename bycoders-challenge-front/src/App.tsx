import { useEffect, useState } from 'react';
import TransactionsList, { dataSourceType } from './components/TransactionsList';
import Upload from './components/Upload';
import { FinancialMovement } from './models/financialMovement';
import { APIConnectService } from './services/apiConnect.service';

import './App.css';

function App() {
  const [transactions, setTransactions] = useState<FinancialMovement[] | null>([]);
  const [fileTransactions, setFileTransactions] = useState<FinancialMovement[]>([]);
  const [isFileCorrect, setIsFileCorrect] = useState<boolean>(false);
  const [dbDataErrorMessage, setDbDataErrorMessage] = useState<string>();

  useEffect(() => {
    APIConnectService.fetchTransactions()
      .then((res) => {
        console.log(res);        
        const transactionsList = (res as FinancialMovement[])
          .map(t => ({...t, datetime: new Date(t.datetime), value: +t.value}));
  
        setTransactions(transactionsList);
      })
      .catch((err) => {
        setTransactions(null);
        setDbDataErrorMessage(`Unable to fetch data from API - ${err}`);
      })
  }, []);

  const transactionsFromFile = (t: FinancialMovement[]) => {
    setFileTransactions(t);
    setIsFileCorrect(!!t.length);
  };

  return (
    <div className="App">
      <p>ByCodersTec / desafio-dev</p>

      <div className='form-container card'>
        <Upload onSetTransactions={transactionsFromFile}></Upload>
      </div>

      {!!transactions && (
        <TransactionsList 
          transactions={transactions}
          fileTransactions={fileTransactions}
          isFileRadioEnabled={isFileCorrect}
        />
      )}
      {(!transactions && dbDataErrorMessage) && (
        <div className='card'>
          <span className='error-msg'>
            {dbDataErrorMessage}
          </span>
        </div>
      )}

    </div>   
  );
}

export default App;

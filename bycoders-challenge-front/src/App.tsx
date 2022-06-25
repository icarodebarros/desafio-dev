import { useEffect, useState } from 'react';
import TransactionsList, { dataSourceType } from './components/TransactionsList';
import Upload from './components/Upload';
import { FinancialMovement } from './models/financialMovement';
import { APIConnectService } from './services/apiConnect.service';

import './App.css';

function App() {
  const [dbTransactions, setDbTransactions] = useState<FinancialMovement[]>([]);
  const [fileTransactions, setFileTransactions] = useState<FinancialMovement[]>([]);
  const [dbDataErrorMessage, setDbDataErrorMessage] = useState<string>();

  useEffect(() => {
    APIConnectService.fetchTransactions()
      .then((res) => {
        console.log(res);        
        const transactionsList = (res as FinancialMovement[])
          .map(t => ({...t, datetime: new Date(t.datetime), value: +t.value}));
  
        setDbTransactions(transactionsList);
      })
      .catch((err) => {
        setDbDataErrorMessage(`Unable to fetch data from API - ${err}`);
      })
  }, []);

  const transactionsFromFile = (t: FinancialMovement[]) => {
    setFileTransactions(t);
  };

  return (
    <div className="App">
      <p>ByCodersTec / desafio-dev</p>

      <div className='form-container card'>
        <Upload onSetTransactions={transactionsFromFile}></Upload>
      </div>

      {(!!dbTransactions.length || !!fileTransactions.length) && (
        <TransactionsList 
          dbTransactions={dbTransactions}
          fileTransactions={fileTransactions}
        />
      )}
      {(dbDataErrorMessage) && (
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

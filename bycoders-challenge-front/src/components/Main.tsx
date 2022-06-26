import React, { useEffect, useState } from 'react';
import { FinancialMovement } from '../models/financialMovement';
import { APIConnectService } from '../services/apiConnect.service';
import TransactionsList from './TransactionsList';
import Upload from './Upload';

import './Main.css';

function Main() {
  const [dbTransactions, setDbTransactions] = useState<FinancialMovement[]>([]);
  const [fileTransactions, setFileTransactions] = useState<FinancialMovement[]>([]);
  const [dbDataErrorMessage, setDbDataErrorMessage] = useState<string>();

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
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
  };

  const transactionsFromFile = (t: FinancialMovement[]) => {
    setFileTransactions(t);
  };

  return (
    <React.Fragment>
      <div className='form-container card'>
        <Upload
          onSetTransactions={transactionsFromFile} 
          onSaveFile={getDataFromAPI}
        />
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
    </React.Fragment>
  );
}

export default Main;

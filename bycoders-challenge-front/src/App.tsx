import { useEffect, useState } from 'react';
import TransactionsList, { dataSourceType } from './components/TransactionsList';
import Upload from './components/Upload';
import { FinancialMovement } from './models/financialMovement';
import { APIConnectService } from './services/apiConnect.service';

import './App.css';

function App() {
  const [transactions, setTransactions] = useState<FinancialMovement[]>([]);
  const [dataSource, setDataSource] = useState<dataSourceType>('fromDB');

  useEffect(() => {
    APIConnectService.fetchTransactions()
      .then((res) => {
        console.log(res);        
        const transactionsList = (res as FinancialMovement[])
          .map(t => ({...t, datetime: new Date(t.datetime), value: +t.value}));
  
        setTransactions(transactionsList);
        setDataSource('fromDB');
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  return (
    <div className="App">
      <p>ByCodersTec / desafio-dev</p>

      <div className='form-container card'>
        <Upload onSetTransactions={setTransactions}></Upload>
      </div>

      {!!transactions.length && (
        <TransactionsList 
          transactions={transactions}
          dataSource={dataSource}
        />
      )}

    </div>   
  );
}

export default App;

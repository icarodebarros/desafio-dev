import { ChangeEvent, useState } from 'react';
import './App.css';
import Upload from './components/Upload';
import { FinancialMovement } from './models/financialMovement';

function App() {
  const [transactions, setTransactions] = useState<FinancialMovement[]>([]);

  const onSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const store = ev.target.value;
    const filtered = transactions.filter(t => t.storeName === store);
    console.log(filtered);
  }

  const loadStoreOptions = () => {
    const storeNames: string[] = [];
    transactions.forEach(item => {
      const index = storeNames.findIndex((storeName) => storeName === item.storeName);
      if (index === -1) {
        storeNames.push(item.storeName.trim());
      }
    })
    const options = storeNames.map(storeName => (
      <option value={storeName} key={storeName}>{storeName}</option>
    ));
    return options;
  }

  return (
    <div className="App">
      <p>ByCodersTec / desafio-dev</p>

      <div className='form-container card'>
        <Upload onSetTransactions={setTransactions}></Upload>
      </div>

      {!!transactions.length && (
        <div className='container'>
          <div className='card select'>
            {/* <label htmlFor='stores'>Choose a Store</label> */}
            <select id='stores' onChange={onSelectChange} defaultValue='emptySelect'>
              <option value='emptySelect' key='select' disabled>Select a Store...</option>
              {loadStoreOptions()}
            </select>
          </div>


        </div>
      )}

    </div>   
  );
}

export default App;

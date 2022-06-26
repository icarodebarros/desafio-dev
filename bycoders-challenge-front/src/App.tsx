import Main from './components/Main';
import './App.css';
import TransactionsContextProvider from './store/transactions-context';

function App() {

  return (
    <TransactionsContextProvider>
      <div className="App">
        <p>ByCodersTec / desafio-dev</p>

        <Main></Main>
      </div>
    </TransactionsContextProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { FinancialMovement } from '../models/financialMovement';


type TransactionsContextObj = {
  dbTransactions: FinancialMovement[];
  fileTransactions: FinancialMovement[];
  setDbTransactions: (t: FinancialMovement[]) => void;
  setFileTransactions: (t: FinancialMovement[]) => void;
};

export const TransactionsContext = React.createContext<TransactionsContextObj>({
  dbTransactions: [],
  fileTransactions: [],
  setDbTransactions: (t: FinancialMovement[]) => {},
  setFileTransactions: (t: FinancialMovement[]) => {}
});

const TransactionsContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
  const [dbTransactions, setDbTransactions] = useState<FinancialMovement[]>([]);
  const [fileTransactions, setFileTransactions] = useState<FinancialMovement[]>([]);

  const contextValue: TransactionsContextObj = {
    dbTransactions,
    fileTransactions,
    setDbTransactions,
    setFileTransactions
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {props.children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContextProvider;
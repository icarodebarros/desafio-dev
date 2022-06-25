import React, { ChangeEvent, useEffect, useState } from 'react';
import { FinancialMovement } from '../models/financialMovement';
import classes from './TransactionsList.module.css';

interface TransactionsListProps {
    transactions: FinancialMovement[];
}

const TransactionsList: React.FC<TransactionsListProps> = (props) => {
    const [storeOptions, setStoreOptions] = useState<JSX.Element[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<FinancialMovement[]>([]);

    useEffect(() => {
        loadStoreOptions();
    }, [props.transactions]);

    const loadStoreOptions = () => {
        const storeNames: string[] = [];
        props.transactions.forEach(item => {
          const index = storeNames.findIndex((storeName) => storeName === item.storeName);
          if (index === -1) {
            storeNames.push(item.storeName.trim());
          }
        })
        const options = storeNames.map(storeName => (
          <option value={storeName} key={storeName}>{storeName}</option>
        ));
        setStoreOptions(options);
    }

    const onSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        const store = ev.target.value;
        setFilteredTransactions(props.transactions.filter(t => t.storeName === store));
    }

    return (
        <React.Fragment>
            <div className={'card ' + classes.select}>
                <select id='stores' onChange={onSelectChange} defaultValue='emptySelect'>
                    <option value='emptySelect' key='select' disabled>Select a Store...</option>
                    {storeOptions}
                </select>
            </div>
        </React.Fragment>
    );
};

export default TransactionsList;

import React, { ChangeEvent, useEffect, useState } from 'react';
import { FinancialMovement } from '../models/financialMovement';
import { Utils } from '../utils/functions';
import { TransactionTypes } from '../utils/transaction-types';
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

    const getTransactionsList = () => {
        if(!!filteredTransactions.length) {
          const list = filteredTransactions.map(t => (
            <div className={classes.transactionItem} key={t.datetime.getTime() + t.value}>
                <div>Card: <span>{t.card}</span></div>
                <div>CPF: <span>{t.cpf}</span></div>
                <div>Date/hour: <span>{t.datetime.toLocaleString("pt-BR")}</span></div>
                <div>Type: <span>{TransactionTypes.get(t.type)?.description}</span></div>
                <div>Value: <span className={TransactionTypes.get(t.type)?.inOut === '+' ?
                  classes.valueG : classes.valueR}>{Utils.formatCurrency(t.value)}</span>
                </div>
            </div>
          ));
          const {storeName, ownerName} = filteredTransactions[0];
          const total = getTotal();
    
          return (
            <React.Fragment>
              <div className={classes.transactionHeader}>{storeName} <span>({ownerName})</span></div>
              {list}
              <p className={classes.total}>Total: <span className={total >= 0 ?
                  classes.valueG : classes.valueR}>{Utils.formatCurrency(total)}</span></p>
            </React.Fragment>
          );
    
        } else {
          return <p className={classes.noStore}>No Sotre selected</p>;
        }
    }

    const getTotal = () => {
        return filteredTransactions.reduce((pre, cur) => {
          return TransactionTypes.get(cur.type)?.inOut === '+' ? pre + cur.value : pre - cur.value;
        }, 0);
    };

    return (
        <React.Fragment>
            <div className={'card ' + classes.select}>
                <select id='stores' onChange={onSelectChange} defaultValue='emptySelect'>
                    <option value='emptySelect' key='select' disabled>Select a Store...</option>
                    {storeOptions}
                </select>
            </div>

            <div className='card'>
                {getTransactionsList()}
            </div>
        </React.Fragment>
    );
};

export default TransactionsList;

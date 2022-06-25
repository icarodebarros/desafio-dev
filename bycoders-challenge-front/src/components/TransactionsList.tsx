import React, { ChangeEvent, useEffect, useState } from 'react';
import { FinancialMovement } from '../models/financialMovement';
import { Utils } from '../utils/functions';
import { TransactionTypes } from '../utils/transaction-types';
import TransactionItem from './TransactionItem';
import classes from './TransactionsList.module.css';

export type dataSourceType = 'fromDB' | 'fromFile';

interface TransactionsListProps {
    dbTransactions: FinancialMovement[];
    fileTransactions: FinancialMovement[];
}

const TransactionsList: React.FC<TransactionsListProps> = (props) => {
    const [storeOptions, setStoreOptions] = useState<JSX.Element[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<FinancialMovement[]>([]);
    const [selectedDataSource, setSelectedDataSource] = useState<dataSourceType>('fromDB');

    useEffect(() => {
        loadStoreOptions(selectedDataSource);
        if (selectedDataSource === 'fromFile' && !props.fileTransactions.length) {
          setFilteredTransactions([]);
        }
    }, [props.dbTransactions, props.fileTransactions]);

    useEffect(() => {
      onRadioChange(props.fileTransactions.length ? 'fromFile' : 'fromDB');
    }, [props.fileTransactions.length]);

    const loadStoreOptions = (dataSource: dataSourceType) => {
      const storeNames: string[] = [];
      const t = dataSource === 'fromDB' ? props.dbTransactions : props.fileTransactions;
      t.forEach(item => {
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

    const onRadioChange = (selected: dataSourceType) => {
      setSelectedDataSource(selected);
      loadStoreOptions(selected);
      setFilteredTransactions([]);
    }

    const onSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
      const store = ev.target.value;
      const movs = selectedDataSource === 'fromDB' ? props.dbTransactions : props.fileTransactions;
      setFilteredTransactions(movs.filter(t => t.storeName === store));
    }

    const getTransactionsList = () => {
        if(!!filteredTransactions.length) {
          const list = filteredTransactions.map((t, i) => (
            <TransactionItem transaction={t} key={i + Math.random()} />
          ));
          const {storeName, ownerName} = filteredTransactions[0];
          const total = getTotal();
    
          return (
            <React.Fragment>
              <div className={classes.transactionHeader}>{storeName} <span>({ownerName})</span></div>
              {list}
              <p className={classes.total}>Total: <span className={total >= 0 ?
                  'valueG' : 'valueR' }>{Utils.formatCurrency(total)}</span></p>
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
            <div className={'card ' + classes.selectionContainer}>
                <div className={classes.radioGroupSection}>
                  <label>Show data from:</label>
                  <div className={classes.radioGroup}>
                      <label>
                        <input type="radio" name="dataSource" value={'fromDB'} 
                          disabled={!props.dbTransactions.length}
                          checked={selectedDataSource === 'fromDB'}
                          onChange={(ev) => onRadioChange(ev.target.value as dataSourceType)}
                        />
                        <span className={!props.dbTransactions.length ? classes.disabled: ''}>database</span>
                      </label>

                      <label>
                        <input type="radio" name="dataSource" value="fromFile"
                          disabled={!props.fileTransactions.length}
                          checked={selectedDataSource === 'fromFile'}
                          onChange={(ev) => onRadioChange(ev.target.value as dataSourceType)}
                        />
                        <span className={!props.fileTransactions.length ? classes.disabled: ''}>current file</span>                        
                      </label>
                  </div>
                </div>

                <div className={classes.select}>
                  <select id='stores' onChange={onSelectChange} defaultValue='emptySelect'>
                      <option value='emptySelect' key='select'>Select a Store...</option>
                      {storeOptions}
                  </select>
                </div>
            </div>

            <div className='card'>
                {getTransactionsList()}
            </div>
        </React.Fragment>
    );
};

export default TransactionsList;

import { FinancialMovement } from '../models/financialMovement';
import { Utils } from '../utils/functions';
import { TransactionTypes } from '../utils/transaction-types';

import classes from './TransactionItem.module.css';

interface TransactionItemProps {
    transaction: FinancialMovement;
    index: number
}

const TransactionItem: React.FC<TransactionItemProps> = (props) => {

    return (
        <div className={classes.transactionItem} key={props.index + Math.random()}>
            <div>
                Card: <span>{props.transaction.card}</span>
            </div>
            <div>
                CPF: <span>{props.transaction.cpf}</span>
            </div>
            <div>
                Date/hour: <span>{props.transaction.datetime.toLocaleString('pt-BR')}</span>
            </div>
            <div>
                Type: <span>{TransactionTypes.get(props.transaction.type)?.description}</span>
            </div>
            <div>
                Value: <span className={TransactionTypes.get(props.transaction.type)?.inOut === '+' ?
                'valueG' : 'valueR' }>{Utils.formatCurrency(props.transaction.value)}</span>
            </div>
        </div>
    );
}

export default TransactionItem;
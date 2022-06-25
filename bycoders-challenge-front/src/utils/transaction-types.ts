// interface transactionType {
//     type: number,
//     description: string,
//     inOut: '+' | '-'
// }

export const TransactionTypes = new Map([
    [1, { type: 1, description: 'Débito', inOut: '+' }],
    [2, { type: 2, description: 'Boleto', inOut: '-' }],
    [3, { type: 3, description: 'Financiamento', inOut: '-' }],
    [4, { type: 4, description: 'Crédito', inOut: '+' }],
    [5, { type: 5, description: 'Recebimento Empréstimo', inOut: '+' }],
    [6, { type: 6, description: 'Vendas', inOut: '+' }],
    [7, { type: 7, description: 'Recebimento TED', inOut: '+' }],
    [8, { type: 8, description: 'Recebimento DOC', inOut: '+' }],
    [9, { type: 9, description: 'Aluguel', inOut: '-' }],
]);

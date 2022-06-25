import { FinancialMovement } from "../models/financialMovement";

const sendPostRequest = (url: string, data: any) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const sendGetRequest = (url: string) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const APIConnectService = {

    saveTransactions: async (data: FinancialMovement[]) => {
    
        const url = 'http://localhost:9001/transactions';
        
        let res;
        try {
            res = await sendPostRequest(url, data);
        } catch(_err) {
            throw new Error('Error in the request');
        }
    
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    }
}

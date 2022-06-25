import { FinancialMovement } from "../models/financialMovement";

const API_URL = 'http://localhost:9001/transactions';

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
        
        let res;
        try {
            res = await sendPostRequest(API_URL, data);
        } catch(_err) {
            throw new Error('Error in saving data request');
        }
    
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    },

    fetchTransactions: async () => {
        let res;
        try {
            res = await sendGetRequest(API_URL);
        } catch(_err) {
            throw new Error('Error in fetching data request');
        }

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    }
}

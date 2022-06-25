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

const sendRequest = async (url: string, op: 'get' | 'post', data?: any) => {      
        
    let res;
    try {
        if (op === 'get') {
            res = await sendGetRequest(url);
        } else {
            res = await sendPostRequest(url, data);
        }
    } catch(_err) {
        throw new Error(`Error in ${op === 'get' ? 'fetching' : 'saving'} data request`);
    }

    if (res.ok) {
        return res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export const APIConnectService = {

    saveTransactions: async (data: FinancialMovement[]) => {      
        return sendRequest(API_URL, 'post', data);
    },

    fetchTransactions: async () => {
        return sendRequest(API_URL, 'get');
    }
}

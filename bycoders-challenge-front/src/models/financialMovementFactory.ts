import { FinancialMovement } from "./financialMovement";

export class FinancialMovementFactory {
    constructor() {}
    
    static build(raw: string) {
        if (raw.length < 80) {
            throw new Error('The content format is wrong');
        }

        const type = raw.substring(0, 1);
        const date = raw.substring(1, 9);
        const value = raw.substring(9, 19);
        const cpf = raw.substring(19, 30);
        const card = raw.substring(30, 42);
        const time = raw.substring(42, 48);
        const ownerName = raw.substring(48, 62);
        const storeName = raw.substring(62, 81);

        const datetime = FinancialMovementFactory.buildFullDate(date, time);

        return new FinancialMovement(
            +type, datetime, +value/100, +cpf, card, ownerName.trim(), storeName.trim()
        );
        
    }

    static buildFullDate(date: string, time: string) {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6);
        const hour = time.substring(0, 2);
        const min = time.substring(2, 4);
        const sec = time.substring(4);
        const datetime = new Date(+year, +month, +day, +hour, +min, +sec);
        if (datetime.toString() === 'Invalid Date') {
            throw new Error('The content format is wrong');
        }
        return datetime;
    }
}
export class FinancialMovement {
    constructor(
        public type: number,
        public datetime: Date,
        public value: number,
        public cpf: number,
        public card: string,
        public ownerName: string,        
        public storeName: string,        
    ) {}
}
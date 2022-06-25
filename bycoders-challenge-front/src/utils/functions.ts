export class Utils {
    
    static formatCurrency = (value: number) => {
        return value.toLocaleString(
            'pt-BR', 
            {style: 'currency', currency: 'BRL', minimumFractionDigits: 2}
        );
    };
}

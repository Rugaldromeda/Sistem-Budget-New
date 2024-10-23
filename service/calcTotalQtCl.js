export const calcTotalQtCl = (arr) => {
    let varTotal = 0;
    for (let i = 0; i < arr.length; i++) {
        
        const total = arr[i];
        const totalValue = total.quantidade_clientes;
        const valor = parseInt(totalValue);
            
        varTotal += valor;        
    }
    return varTotal;
}
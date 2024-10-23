export const calcTotalMoney = (arr) => {

    let varTotal = 0;
    for (let i = 0; i < arr.length; i++) {
        
        const total = arr[i];
        const totalValue = total.total;
        const valor = parseFloat(totalValue);
        varTotal += valor; 

    }
    
    return parseFloat(varTotal).toFixed(2);
}
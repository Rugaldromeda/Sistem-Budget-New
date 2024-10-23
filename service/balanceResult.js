export const balanceResult= ()=>{
    const tableTotalReceipt1 = document.querySelector(".totalStore1").textContent.replace(",","");
    const tableTotalReceipt2 = document.querySelector(".totalStore2").textContent.replace(",","");
    const tableTotalExpense = document.querySelector(".total-expense").textContent.replace(",","");
    const balanceYear = parseFloat((parseInt(tableTotalReceipt1) + parseInt(tableTotalReceipt2)) - tableTotalExpense).toFixed(2);

    const tableTotalqt1 = document.querySelector(".qt1").textContent;
    const tableTotalqt2 = document.querySelector(".qt2").textContent;
    const totalClientAll = parseInt(tableTotalqt1)+parseInt(tableTotalqt2);
    const tableTotalClient = document.querySelector(".qtTotal");
    let tableBalance = document.querySelector(".balance");
    if(balanceYear < 0){
        tableBalance.classList.add("negative-balance");
    }
    else{
        tableBalance.classList.remove("negative-balance");
    }
    const balanceToString = balanceYear.toString();
    const balanceMask = balanceToString.replace(/(\d{3})?(\d{3})(\d{3})(\.\d{2})/, "$1,$2,$3$4");
    tableBalance.innerHTML = balanceMask;
    tableTotalClient.innerHTML = totalClientAll;
}
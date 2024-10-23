"use strict"

import { Expense } from "./create__expenses.js";
import { orderDates } from "../service/data.js";
import { acoes } from "../service/dataService.js";

export const createTbodyExpense = (dateYm, formId) => {
    
    const createTbody = document.createElement('tbody');
    createTbody.classList.add("table-expense");


    createTbody.setAttribute( "value" , dateYm);
    const tBodyValue = createTbody.getAttribute("value");

    
    const renderExpenses = async () =>  {
        try {
            const expenses = await acoes.listaDespesas();
            orderDates(expenses);
            expenses.forEach((expense) => {
        
                const day = dayjs(expense.data, 'DD/MM/YYYY')
                const dayFormatYm = dayjs(day).format('YYYYMM')
        
                if(tBodyValue === dayFormatYm ) {
                    
                    createTbody.appendChild(Expense(expense, formId))
                }
            
            
            })
        }
        catch(erro){
            console.log(erro);
            alert("Erro de sincronização");
        }
        
    }

    renderExpenses();
    return createTbody;
}
"use strict"

import { editExpenseTr } from "./td__report__action/buttonExpenseEdit.js";
import { createTd, actionAreaExpense } from "./createTd.js";
import { tablesLoad } from "./tables__load.js";
import { acoes } from "../service/dataService.js";
import { newPeriod } from "./create__new__period.js";


export const handleNewExpense = (event) => {
    event.preventDefault();
    const formId = event.target.getAttribute("id");

    const formArea = document.querySelector(`#${formId}`);
    
    if(formId === "edit"){
        editExpenseTr(formId);
    }
    else{
        inputDataExpense(formId);
    }
    
    formArea.reset();

    tablesLoad();
}
// captura os dados do formulario em questão
const inputDataExpense = (formId) => {
    
    const formBody = document.querySelector(`#${formId}`);

    const expenseDate = formBody.querySelector("[data-expense-date]");
    const dateValue = dayjs(expenseDate.value);
    const data = dateValue.format('DD/MM/YYYY');
    const dataYm = dateValue.format('YYYYMM');
    const data_ano = dateValue.format('YYYY');

    const expenseName = formBody.querySelector("[data-expense-name]");
    const nome_despesa = expenseName.value;

    const expenseValue = formBody.querySelector("[data-expense-value]");
    const valor_despesa = parseFloat(expenseValue.value.replace(",",".")).toFixed(2);

    


    
    const criaDespesa = async () => {
        try {
            

            await acoes.criaDespesa(data,nome_despesa, valor_despesa,data_ano, formId);
                
        }
        catch (erro) {
            console.log(erro)
            alert("Erro de sincronia")
        }
    }
    
    criaDespesa();

    newPeriod(dataYm);
}

// insere os dados no html
export const Expense = ({data, nome_despesa, total,id}, formId ) => {
    
    const tableTr = document.createElement("tr");
    tableTr.classList.add("table-expenses");

    tableTr.appendChild(createTd(data));
    tableTr.appendChild(createTd(nome_despesa));
    tableTr.appendChild(createTd(total)).classList.add("totalExpense");
    tableTr.appendChild(actionAreaExpense(tablesLoad, id, formId))
    
    
    return tableTr;

}

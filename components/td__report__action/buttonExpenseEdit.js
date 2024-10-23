"use strict"

import { acoes } from "../../service/dataService.js";
import { newPeriod } from "../create__new__period.js";

const loadExpenseInput = (loadtable, id, trId) => {

    const formSet = document.querySelector(`.${trId}`)
    formSet.setAttribute("id", "edit");

    const expenseSaved = async ()=> {
        try{
            const expensesSaved = await acoes.buscaItemId(trId,id);

            const data = expensesSaved.data;
            const dateRaw = dayjs(data, 'DD/MM/YYYY')
            const dateSelect = dayjs(dateRaw).format('YYYY-MM-DD');
            const nome_despesa = expensesSaved.nome_despesa;
            const valor_despesa = expensesSaved.total;

            const dados = {
                dateSelect,
                nome_despesa,
                valor_despesa
            }

            
            formSet.querySelector("[data-expense-date]").setAttribute("value" ,dados.dateSelect );

            formSet.querySelector("[data-expense-name]").value = dados.nome_despesa;

            formSet.querySelector("[data-expense-value]").value = dados.valor_despesa;


            formSet.querySelector("[data-index]").value = id;
            formSet.querySelector("[data-tr-id]").value = `${trId}`;

            const buttonSave = formSet.querySelector("[data-submit-form]");
            buttonSave.textContent = "Salvar";
        }
        catch(erro){
            console.log(erro)
            alert("Erro de sincronização");
        }
    }
    expenseSaved();
    return loadtable, id, trId
}

export const editExpenseTr = (editId) => {
    const editBody = document.querySelector(`#${editId}`);
    editBody.setAttribute("class", "edit");
    const editInputs = document.querySelector(`.${editId}`)

    const expenseDate = editInputs.querySelector("[data-expense-date]");
    const dateValue = dayjs(expenseDate.value);
    const data = dayjs(dateValue).format('DD/MM/YYYY');
    const dataYm = dateValue.format('YYYYMM');
    const data_ano = dateValue.format('YYYY');

    const expenseName = editInputs.querySelector("[data-expense-name]");
    const nome_despesa = expenseName.value;

    const expenseValue = editInputs.querySelector("[data-expense-value]");
    const valor_despesa = parseFloat(expenseValue.value.replace(",",".")).toFixed(2);


    const inputHiddenIndex = editInputs.querySelector("[data-index");
    const index= inputHiddenIndex.value;

    const inputHiddenTrId = editInputs.querySelector("[data-tr-id]");
    const trIdValue = inputHiddenTrId.value;


    const buttonSave = editInputs.querySelector("[data-submit-form]");
    buttonSave.textContent = "Adicionar"

    

    const atualizaDespesa = async ()=> { 
        try {
          await acoes.atualizaDespesa(index,data,nome_despesa,valor_despesa, data_ano,trIdValue);
          
          newPeriod(dataYm);
        }
        catch(erro){
          console.log(erro);
        }
    }
    atualizaDespesa();
    editBody.setAttribute("class", `${trIdValue}`);
    editBody.setAttribute("id", `${trIdValue}`);
}

export const buttonEditExpense = (loadtable, id, trId) => {
    const editExpenseButton = document.createElement("button");
    editExpenseButton.innerHTML = `<img src="https://img.icons8.com/external-becris-lineal-becris/17/000000/external-edit-mintab-for-ios-becris-lineal-becris.png"/>`;

    editExpenseButton.addEventListener("click" , () => loadExpenseInput(loadtable, id, trId))
    
    return editExpenseButton;
}
"use strict"

import { acoes } from "./dataService.js";
import { checkValue } from "./checkValue.js";
import { calcTotalMoney } from "./calcTotalMoney.js";
import { calcTotalQtCl } from "./calcTotalQtCl.js";
import { balanceResult } from "./balanceResult.js";

export const filterYear = (event) =>{
    event.preventDefault()

    const valor_ano = document.querySelector("[data-input-year]");
    
    receitasLoja1(valor_ano);
    receitasLoja2(valor_ano);
    listaDespesas(valor_ano);
    
    setTimeout(balanceResult, 1000);
}




const receitasLoja1 = async (valor_ano) => {
    try{
        const receitasLoja1 = await acoes.listaReceitas1();
        let receitasFiltro1 = receitasLoja1.filter(receiptSt1 => (receiptSt1.data_ano == valor_ano.value));
        
        const totalLoja1 = calcTotalMoney(receitasFiltro1);
        const totalClientLoja1 = calcTotalQtCl(receitasFiltro1);
        const tableTotalReceipt1 = document.querySelector(".totalStore1");
        const tableTotalqt1 = document.querySelector(".qt1");
        checkValue(receitasFiltro1,tableTotalReceipt1,totalLoja1);
        checkValue(receitasFiltro1,tableTotalqt1,totalClientLoja1);
    }
    catch(erro){
        console.log(erro);
        alert("Erro de sincronização");
    }
}

const receitasLoja2 = async (valor_ano) => {
    try{
        const receitasLoja2 = await acoes.listaReceitas2();
        let receitasFiltro2 = receitasLoja2.filter(receiptSt2 => (receiptSt2.data_ano == valor_ano.value));

        const totalLoja2 = calcTotalMoney(receitasFiltro2);
        const totalClientLoja2 = calcTotalQtCl(receitasFiltro2);
        const tableTotalReceipt2 = document.querySelector(".totalStore2");
        const tableTotalqt2 = document.querySelector(".qt2");
        checkValue(receitasFiltro2,tableTotalReceipt2, totalLoja2);
        checkValue(receitasFiltro2,tableTotalqt2,totalClientLoja2);
    }
    catch(erro){
        console.log(erro);
        alert("Erro de sincronização");
    }
}
const listaDespesas = async (valor_ano)=>{
    try{
        const listaDespesas = await acoes.listaDespesas();
        let despesasFiltro = listaDespesas.filter(expense => (expense.data_ano == valor_ano.value));
        const totalDespesa = calcTotalMoney(despesasFiltro);
        const tableTotalExpense = document.querySelector(".total-expense");
        checkValue(despesasFiltro,tableTotalExpense, totalDespesa);

    }
    catch(erro){
        console.log(erro);
        alert("Erro de sincronização");
    }
}

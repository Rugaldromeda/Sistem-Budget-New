"use strict"

import { calcTotalMoney } from "./calcTotalMoney.js";
import { calcTotalQtCl } from "./calcTotalQtCl.js";
import { checkValue } from "./checkValue.js";
import { acoes } from "./dataService.js";
import { balanceResult } from "./balanceResult.js";

export const getPeriod = (event) => {
    event.preventDefault();
    const initialTime = document.querySelector("[data-input-initial]");
    const finalTime = document.querySelector("[data-input-final]");
    const initialTimeValue = dayjs(initialTime.value);
    const initial = dayjs(initialTimeValue).format('YYYYMMDD');
    const finalTimeValue = dayjs(finalTime.value);
    const final = dayjs(finalTimeValue).format('YYYYMMDD');

    searchPeriod(initial,final);

}
const searchPeriod = (startTime, finishTime) => {
    listaDespesas(startTime,finishTime);
    listaReceitas1(startTime,finishTime);
    listaReceitas2(startTime, finishTime);
  
    setTimeout(balanceResult, 1500);  
}
const createNewArrayReceipt = (listReceipts) =>{
    //formata a data e cria um novo array para filtrar o periodo
    const arrReturn = [];
    for (let i = 0; i < listReceipts.length; i++) {
        const listReceipt = listReceipts[i];
        const dateFormat = listReceipt.data;
        const dateRaw = dayjs(dateFormat, 'DD/MM/YYYY')
        const data_selecionada = dayjs(dateRaw).format('YYYYMMDD');
        const total = listReceipt.total;
        const quantidade_clientes = listReceipt.quantidade_clientes;

        const dataReceipt = {
            data_selecionada,
            total,
            quantidade_clientes
        }
        
        arrReturn.push(dataReceipt)
        
    }

    return arrReturn;
}
const createNewArrayExpense = (listExpenses) =>{
    //formata a data e cria um novo array para filtrar o periodo
    const arrReturn = [];
    for (let i = 0; i < listExpenses.length; i++) {
        const listExpense = listExpenses[i];
        const dateFormat = listExpense.data;
        const dateRaw = dayjs(dateFormat, 'DD/MM/YYYY')
        const data_selecionada = dayjs(dateRaw).format('YYYYMMDD');
        const total = listExpense.total;

        const dataExpenses = {
            data_selecionada,
            total
        }
        
        arrReturn.push(dataExpenses)
        
    }

    return arrReturn;
}

const filterPeriod = (arr, startTime, finishTime) => {
    const period = arr.filter(array => (array.data_selecionada >= `${startTime}` && array.data_selecionada <= `${finishTime}`));

    return period;
}

const listaDespesas = async (startTime,finishTime)=>{
    try{
        const listaDespesas = await acoes.listaDespesas();
        const arrayExpenses = createNewArrayExpense(listaDespesas);
        
        let periodExpenses = filterPeriod(arrayExpenses,startTime,finishTime);
        const totalDespesa = calcTotalMoney(periodExpenses);
        const tableTotalExpense = document.querySelector(".total-expense");
        checkValue(periodExpenses, tableTotalExpense, totalDespesa);
        

    }
    catch(erro){
        console.log(erro);
        alert("Erro de sincronização");
    }
}
const listaReceitas1 = async (startTime,finishTime)=>{
    try{
        const listaReceitas1 = await acoes.listaReceitas1();
        const arrayReceiptsSt1 = createNewArrayReceipt(listaReceitas1);
        let periodReceitpsSt1 = filterPeriod(arrayReceiptsSt1,startTime,finishTime);
        const totalReceitas1 = calcTotalMoney(periodReceitpsSt1);
        const totalClientLoja1 = calcTotalQtCl(periodReceitpsSt1);
        const tableTotalReceipt1 = document.querySelector(".totalStore1");
        const tableTotalqt1 = document.querySelector(".qt1");
        checkValue(periodReceitpsSt1, tableTotalReceipt1, totalReceitas1);
        checkValue(periodReceitpsSt1,tableTotalqt1,totalClientLoja1);

    }
    catch(erro){
        console.log(erro);
        alert("Erro de sincronização");
    }
}
const listaReceitas2 = async (startTime, finishTime)=>{
    try{
        const listaReceitas2 = await acoes.listaReceitas2();
        const arrayReceiptsSt2 = createNewArrayReceipt(listaReceitas2);
        let periodReceitpsSt2 = filterPeriod(arrayReceiptsSt2,startTime,finishTime);
        const totalReceitas2 = calcTotalMoney(periodReceitpsSt2);
        const totalClientLoja2 = calcTotalQtCl(periodReceitpsSt2);
        const tableTotalReceipt2 = document.querySelector(".totalStore2");
        const tableTotalqt2 = document.querySelector(".qt2");
        checkValue(periodReceitpsSt2, tableTotalReceipt2, totalReceitas2);
        checkValue(periodReceitpsSt2,tableTotalqt2,totalClientLoja2);

    }
    catch(erro){
        console.log(erro);
        alert("Erro de sincronização");
    }
}
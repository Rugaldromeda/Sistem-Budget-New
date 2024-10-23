"use strict"

import { editTr } from "./td__report__action/buttonEdit.js";
import { createTd, actionArea } from "./createTd.js";
import { tablesLoad } from "./tables__load.js";
import { newPeriod } from "./create__new__period.js";
import { acoes } from "../service/dataService.js";


export const handleNewReceipt = (event) => {
    event.preventDefault();
    const formId = event.target.getAttribute("id");

    const formArea = document.querySelector(`#${formId}`);
    
    if(formId === "edit"){
        editTr(formId);
    }
    else{
        inputDataReceipt(formId);
    }
    
    
    
    formArea.reset();

    tablesLoad();
}
// captura os dados do formulario em questão
const mapApis = new Map();
mapApis.set('receiptStore1', acoes.listaReceitas1);
mapApis.set('receiptStore2', acoes.listaReceitas2)
const inputDataReceipt = (formId) => {

    const formBody = document.querySelector(`#${formId}`);

    const receiptDate = formBody.querySelector("[data-receipt-date]");
    const dateValue = dayjs(receiptDate.value);
    const data = dateValue.format('DD/MM/YYYY');
    const dataYm = dateValue.format('YYYYMM');
    const data_ano = dateValue.format('YYYY');

    const receiptMoney = formBody.querySelector("[data-receipt-money]");
    const venda_dinheiro = Number(receiptMoney.value.replace(",","."));

    const receiptDebit = formBody.querySelector("[data-receipt-debit]");
    const venda_debito = Number(receiptDebit.value.replace(",","."));

    const receiptCredit = formBody.querySelector("[data-receipt-credit]");
    const venda_credito = Number(receiptCredit.value.replace(",","."));

    const receiptVoucher = formBody.querySelector("[data-receipt-voucher]");
    const venda_voucher = Number(receiptVoucher.value.replace(",","."));

    const total = parseFloat(venda_dinheiro + venda_debito + venda_credito + venda_voucher).toFixed(2);

    const qtClients = formBody.querySelector("[data-receipt-qtclient]");
    const quantidade_clientes = Number(qtClients.value);

    const createReceipt = async () => {
        try {
            

            await acoes.criaReceita(data,venda_dinheiro,venda_debito,venda_credito,
                venda_voucher,total,quantidade_clientes,data_ano,formId);
                
        }
        catch (erro) {
            console.log(erro)
            alert("Erro de sincronia")
        }
    }
    console.log(dataYm)

    createReceipt();
    newPeriod(dataYm);
}

// insere os dados no html
export const Receipt = ({data,venda_dinheiro,venda_debito,venda_credito,venda_voucher,total,quantidade_clientes,id }, formId ) => {
    
    const tableTr = document.createElement("tr");
    tableTr.classList.add("table-receipts");

    tableTr.appendChild(createTd(data));
    tableTr.appendChild(createTd(venda_dinheiro));
    tableTr.appendChild(createTd(venda_debito));
    tableTr.appendChild(createTd(venda_credito));
    tableTr.appendChild(createTd(venda_voucher));
    tableTr.appendChild(createTd(`R$ <a class="total">${total}</a>`));
    tableTr.appendChild(createTd(`<a class="qtClient">${quantidade_clientes}</a>`));
    tableTr.appendChild(actionArea(tablesLoad, id, formId));
    
    return tableTr;

}

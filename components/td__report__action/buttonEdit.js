"use strict"

import { acoes } from "../../service/dataService.js";
import { newPeriod } from "../create__new__period.js";


const loadTrInput = (loadtable, id, trId) => {
    
    const formSet = document.querySelector(`.${trId}`);
    formSet.setAttribute("id", "edit");

    const mapApis = new Map();
    mapApis.set('receitasLoja1', acoes.listaReceitas1);
    mapApis.set('receitasLoja2', acoes.listaReceitas2);

    const receiptSaved = async () =>  {
        try {

            const receiptsSaved = await acoes.buscaItemId(trId,id);
            const dateFormat = receiptsSaved.data;
            const dateRaw = dayjs(dateFormat, 'DD/MM/YYYY')
            const dateSelect = dayjs(dateRaw).format('YYYY-MM-DD');
            const money = receiptsSaved.venda_dinheiro;
            const debit = receiptsSaved.venda_debito;
            const credit = receiptsSaved.venda_credito;
            const voucher = receiptsSaved.venda_voucher;
            const total = receiptsSaved.total;
            const qtClient = receiptsSaved.quantidade_clientes;

            const dados = {
                dateSelect,
                money,
                debit,
                credit,
                voucher,
                total,
                qtClient
            }

            formSet.querySelector("[data-receipt-date]").setAttribute("value" ,dados.dateSelect );

            formSet.querySelector("[data-receipt-money]").value = dados.money;

            formSet.querySelector("[data-receipt-debit]").value = dados.debit;

            formSet.querySelector("[data-receipt-credit]").value = dados.credit;

            formSet.querySelector("[data-receipt-voucher]").value = dados.voucher;

            formSet.querySelector("[data-receipt-qtclient]").value = dados.qtClient;

            formSet.querySelector("[data-index]").value = id;
            formSet.querySelector("[data-tr-id]").value = `${trId}`;

            const buttonSave = formSet.querySelector("[data-submit-form]");
            buttonSave.textContent = "Salvar"
        }
        catch(erro){
            console.log(erro)
            alert("Erro de sincronização");
        }
    }   
    receiptSaved();
    
    return loadtable, id, trId;
}

export const editTr = (editId) => {
    const editBody = document.querySelector(`#${editId}`);
    editBody.setAttribute("class", "edit");
    const editInputs = document.querySelector(`.${editId}`);

    const receiptDate = editInputs.querySelector("[data-receipt-date]");
    const dateValue = dayjs(receiptDate.value);
    const data = dayjs(dateValue).format('DD/MM/YYYY');
    const dataYm = dateValue.format('YYYYMM');
    const data_ano = dateValue.format('YYYY');

    const receiptMoney = editInputs.querySelector("[data-receipt-money]");
    const venda_dinheiro = Number(receiptMoney.value.replace(",","."));

    const receiptDebit = editInputs.querySelector("[data-receipt-debit]");
    const venda_debito = Number(receiptDebit.value.replace(",","."));

    const receiptCredit = editInputs.querySelector("[data-receipt-credit]");
    const venda_credito = Number(receiptCredit.value.replace(",","."));

    const receiptVoucher = editInputs.querySelector("[data-receipt-voucher]");
    const venda_voucher = Number(receiptVoucher.value.replace(",","."));

    const total = parseFloat(venda_dinheiro + venda_debito + venda_credito + venda_voucher).toFixed(2);

    const qtClients = editInputs.querySelector("[data-receipt-qtclient]");
    const quantidade_clientes = Number(qtClients.value);

    const inputHiddenIndex = editInputs.querySelector("[data-index");
    const index = inputHiddenIndex.value;

    const inputHiddenTrId = editInputs.querySelector("[data-tr-id]");
    const trIdValue = inputHiddenTrId.value;


    const buttonSave = editInputs.querySelector("[data-submit-form]");
    buttonSave.textContent = "Adicionar"


    const atualizaReceita = async ()=> { 
        try {
          await acoes.atualizaReceita(index,data,venda_dinheiro,venda_debito,venda_credito,
            venda_voucher,total,quantidade_clientes,data_ano,trIdValue);
            
            newPeriod(dataYm);
        }
        catch(erro){
          console.log(erro);
        }
    }
    atualizaReceita();

    editBody.setAttribute("class", `${trIdValue}`);
    editBody.setAttribute("id", `${trIdValue}`);
}


//const receiptData = (data) => {

//}
export const buttonEdit = (loadtable, id, trId) => {
    const editButton = document.createElement("button");
    editButton.innerHTML = `<img src="https://img.icons8.com/external-becris-lineal-becris/17/000000/external-edit-mintab-for-ios-becris-lineal-becris.png"/>`;

    editButton.addEventListener("click" , () => loadTrInput(loadtable, id, trId))
    
    return editButton;
}



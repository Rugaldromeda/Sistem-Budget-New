"use strict"
import { createTbodyExpense } from "./create__tbody__expense.js";
import { createTbodyReceipt } from "./create__tbody__receipt.js";
import { balance } from "../service/balance.js";
import { acoes } from "../service/dataService.js";


export const tablesLoad = () => {
    const listReceiptStore = document.querySelectorAll('[data-table-receipt-store]');
    
    for (let i = 0; i < listReceiptStore.length; i++) {
        const listsStore = listReceiptStore[i];
        
        

        const listThead = `<thead>
                            <th>Data</th>
                            <th>Dinheiro</th>
                            <th>Débito</th>
                            <th>Credito</th>
                            <th>Voucher</th>
                            <th>Total</th>
                            <th>Qt.Clientes</th>
                            <th>Ações</th>
                        </thead>`;
        const listTfoot = `<tfoot data-tfoot>
                                <th>Data</th>
                                <th>Dinheiro</th>
                                <th>Débito</th>
                                <th>Credito</th>
                                <th>Voucher</th>
                                <th>Total</th>
                                <th>Qt.Clientes</th>
                                <th>Ações</th>
                            </tfoot>`;

        listsStore.innerHTML = " ";
        listsStore.innerHTML = `${listThead} ${listTfoot}`;

        const listId = listsStore.getAttribute("id");

        const listValueStore = listsStore.getAttribute("value");
       
        const renderMY = async () =>  {
            try {
                const periodos = await acoes.periodos();
                
                periodos.forEach((dataYm) => {
            
                    if(listValueStore === dataYm.periodo ){
                        listsStore.insertBefore(createTbodyReceipt(dataYm.periodo, listId) ,listsStore.children[1]);
                    }

                    
                })
            }
            catch(erro){
                console.log(erro)
                alert("Erro de sincronização");
            }
            
        }
        
        renderMY()

    }
    const listExpense = document.querySelector("[data-table-expense]");

    
    const listTheadExpense = `<thead>
                                <th>Data</th>
                                <th class="report__table__name">Nome</th>
                                <th class="report__table__name">Valor</th>
                                <th>Ações</th>
                              </thead>`;
    const listTfootExpense = `<tfoot data-tfoot>
                                <th>Data</th>
                                <th class="report__table__name">Nome</th>
                                <th class="report__table__name">Valor</th>
                                <th>Ações</th>
                             </tfoot>`;

    listExpense.innerHTML = " ";
    listExpense.innerHTML = `${listTheadExpense} ${listTfootExpense}`;
    const listExpenseId = listExpense.getAttribute("id");

    const listValueExpense = listExpense.getAttribute("value");
    const renderMYEx = async () =>  {
        try {
            const mesAno = await acoes.periodos();
            mesAno.forEach((dataYm) => {
        
                if(listValueExpense == dataYm.periodo ){
                    listExpense.insertBefore(createTbodyExpense(dataYm.periodo, listExpenseId) ,listExpense.children[1]);
                }
                
                
            })
        }
        catch(erro){
            console.log(erro)
            alert("Erro de sincronização");
        }
        
    }
    renderMYEx();

    setTimeout(balance, 1500);
    
}
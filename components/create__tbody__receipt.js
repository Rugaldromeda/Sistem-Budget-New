"use strict"
import {Receipt} from "./create__receipt.js";
import { orderDates } from "../service/data.js";
import { acoes } from "../service/dataService.js";


const mapApis = new Map();
mapApis.set('receitasLoja1', acoes.listaReceitas1);
mapApis.set('receitasLoja2', acoes.listaReceitas2);
export const createTbodyReceipt = (dateYm, formId) => {
    
    const createTbody = document.createElement('tbody')
    createTbody.classList.add("table-receipt")
   
    createTbody.setAttribute( "value" , dateYm)
    const tBodyValue = createTbody.getAttribute("value");
    const renderReceipts = async () =>  {
        try {
            const receipts = await mapApis.get(`${formId}`)();
            orderDates(receipts);
            receipts.forEach((receipt) => {
        
                const day = dayjs(receipt.data, 'DD/MM/YYYY')
                const dayFormatYm = dayjs(day).format('YYYYMM')
        
                if(tBodyValue === dayFormatYm ) {
                    
                    createTbody.appendChild(Receipt(receipt, formId))
                }
            
            
            })
        }
        catch(erro){
            console.log(erro)
            alert("Erro de sincronização");
        }
        
    }
    
    renderReceipts()
    
    return createTbody;
}
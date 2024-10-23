"use strict"

import { acoes } from "../../service/dataService.js";

const deletTr = async (loadtable, id, formId) => {
    const index = id;
    if(confirm("Deseja mesmo excluir?")){
        try {
            await acoes.removeDado(formId,index)
            
        }
        catch(erro){
            console.log(erro)
            alert("Não foi possível excluir!");
        }
    }
    
    loadtable();
}

const buttonDelet = (loadtable, id, formId) => {
    const deletButton = document.createElement("button");
    deletButton.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;

    deletButton.addEventListener("click" , () => deletTr( loadtable, id, formId) )
    return deletButton;
    /* vou transformar o parametro recebido pela função em outra função, 
    isso servira para reativar a função loadtable(), que carregar de novo as
    tds na tela
    */

}


export default buttonDelet;
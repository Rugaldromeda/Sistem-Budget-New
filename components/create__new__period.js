"use strict"
import { acoes } from "../service/dataService.js"
export const newPeriod = async (data) => {
    
    try {
        const monthYear = await acoes.periodos();
        
        const checkRepeat = monthYear.find(element => element.periodo == data);
        console.log(checkRepeat);
        if(checkRepeat == undefined){
            console.log("Data ainda não existe");
            createPeriod(data); 
            window.location.reload();
        }
        
    }
    catch(jaExiste){
        console.log("Já existe")
    }
}

export const createPeriod = async (data) => {
    try {
        
        await acoes.criaPeriodo(data);
            
    }
    catch (erro) {
        console.log(erro)
        alert("Erro de sincronia")
    }
}
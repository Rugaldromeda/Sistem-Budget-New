// confirmação se existem valores para o campo
export const checkValue = (qtDiv, htmlContent, valueToAttribute) =>{
    if(qtDiv.length == 0){
        htmlContent.innerHTML = "0";
    }
    else{
        const value = valueToAttribute.toString().replace(/(\d{3})?(\d{3})(\d{3})(\.\d{2})/, "$1,$2,$3$4");
        htmlContent.innerHTML = value ;
    } 
}
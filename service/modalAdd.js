"use strict"

export const activeModal = ()=>{
    const buttonAddReceipt = document.querySelector(".report__label_add");
    const modalAddReceipt = document.querySelector(".modal_add_receipt");

    const openModal = ()=>{
        modalAddReceipt.classList.remove("invisible")
        
    }
    buttonAddReceipt.addEventListener("click", openModal)
}

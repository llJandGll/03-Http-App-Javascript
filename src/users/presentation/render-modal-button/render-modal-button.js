/**
 * 
 * @param {HTMLDivElement} element 
 * @param { () => void } callback
 */
import { showModal } from "../render-modal/render-modal";
import "./render-modal-button.css"

const fabButton = document.createElement("button");

export const renderModalButton = ( element ) => {
  
  fabButton.innerText = "+";
  fabButton.className = "fab-button";

  element.append( fabButton );

  modalButton();
};


const modalButton = () => {
    fabButton.addEventListener("click", () => {
      showModal()
    });
};
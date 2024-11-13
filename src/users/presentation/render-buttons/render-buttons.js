/**
 * 
 * @param {HTMLDivElement} element 
 */

import usersStore from "../../store/users-store";
import { renderTable } from "../";
import "./render-buttons.css"

const nextButton = document.createElement("button");
const prevButton = document.createElement("button");
const currentPageLavel = document.createElement("span");


export const renderButtons = ( element ) => {
  nextButton.innerText = ` Next > `
  prevButton.innerText = `< Prev `;


  currentPageLavel.id = "current-page"
  currentPageLavel.innerText = usersStore.getCurrentPage()
  
  element.append( prevButton , currentPageLavel, nextButton );

  nextButtonPage( nextButton, element );
  previousButtonPage( prevButton, element );
};


const nextButtonPage = ( nextPage, element ) => {

  nextPage.addEventListener("click", async () => {
    
    await usersStore.loadNextPage();
    currentPageLavel.innerText = usersStore.getCurrentPage();
    renderTable( element );
  });
};

const previousButtonPage = ( previousPages , element ) => {
  previousPages.addEventListener("click", async () => {
    
    await usersStore.loadPreviousPage();
    currentPageLavel.innerText = usersStore.getCurrentPage();
    renderTable( element );
  });
};
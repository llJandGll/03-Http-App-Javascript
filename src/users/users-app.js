/**
 * 
 * @param {HTMLDivElement} element 
 */

import { renderButtons, renderTable } from "./presentation";
import { renderModalButton } from "./presentation/render-modal-button/render-modal-button";
import { renderModal } from "./presentation/render-modal/render-modal";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

export const UsersApp = async ( element ) => {
  
  element.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  element.innerHTML = "";
  
  renderTable( element );
  renderButtons( element )
  renderModalButton( element );
  renderModal( element, async ( userLike ) =>{ 
    console.log(" entra aqui ");
    
    const user = await saveUser ( userLike );
    
    usersStore.onUserChanged( user );

    renderTable( element );
  });
};
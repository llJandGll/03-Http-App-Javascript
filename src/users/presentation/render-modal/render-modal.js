import modalHtml from "./render-modal.html?raw"
import "./render-modal.css"
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form, loadedUser = {};

/**
 * 
 * @param {HTMLDivElement} element 
 * @param { (userLike) => Promise<void> } callback 
*/
export const renderModal = (element, callback) => {
  
  modal = document.createElement("div");
  modal.className = "modal-container hide-modal";
  modal.innerHTML = modalHtml;
  form = modal.querySelector("form")
  element.append(modal);
  
  modal.addEventListener("click", ({ target }) => {
    if (target.className !== "modal-container") return;
    hideModal();
  });
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const userLike = { ...loadedUser };

    // Recorrer los datos del formulario
    for (const [key, value] of formData) {
      userLike[key] = value;

      if (key === "balance") {
        userLike[key] = +value; // Convertir el balance a número
        continue;
      }
    }

    // Capturar manualmente el estado del checkbox "isActive"
    userLike.isActive = form.querySelector('[name="isActive"]').checked;

    // Imprimir para depurar
    console.log("User object to save:", userLike);

    clearForm(form);
    await callback(userLike);
    
    hideModal();
  });
};

/**
 * Limpiar el formulario
 * @param {HTMLFormElement} form 
 */
const clearForm = (form) => {
  form.reset();
};

/**
 * Mostrar el modal y cargar los valores del usuario si existe un id
 * @param {String|Number} id 
 */
export const showModal = async (id) => {
  modal?.classList.remove("hide-modal");
  
  if (!id) return;

  const user = await getUserById(id);
  setFormValues(user);
};

/**
 * Establecer los valores del formulario con los datos del usuario
 * @param {Object} user 
 */
const setFormValues = (user) => {
  form.querySelector('[name="firstName"]').value = user.firstName;
  form.querySelector('[name="lastName"]').value = user.lastName;
  form.querySelector('[name="balance"]').value = user.balance;

  // Establecer el estado del checkbox correctamente
  form.querySelector('[name="isActive"]').checked = user.isActive;

  // Guardar el usuario cargado para referencia futura
  loadedUser = user;
};

/**
 * Ocultar el modal y reiniciar el formulario
 */
export const hideModal = () => {
  modal?.classList.add("hide-modal");
  form?.reset();
};

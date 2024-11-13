import { loadUsersByPage } from "../use-cases";

const state = {
  currentPage : 0,
  users: [],
}

const getUsers = () => [...state.users];
const getCurrentPage = () => state.currentPage;


const loadNextPage = async () => {
  
  const users = await loadUsersByPage( state.currentPage + 1 )

  if ( users.length === 0) return;

  state.currentPage += 1;
  state.users = users;

  return users;
};


const loadPreviousPage = async () => {
  if ( state.currentPage < 1 ) return;
  
  const users = await loadUsersByPage( state.currentPage - 1);
  
  if ( users.length === 0) return;

  state.currentPage -= 1;
  state.users = users;

  return users;
};

const onUserChanged = async( updatedUser ) => {
  let wasFound = false;
  state.users = state.users.map( user => {
    if( user.id === updatedUser.id){
      wasFound = true;
      return updatedUser;
    }
    return user;
  });

  if( state.users.length < 10 && !wasFound ){
    state.users.push( updatedUser );
  }
};

const reloadPage = async () => {
  const users = await loadUsersByPage( state.currentPage )

  if ( users.length === 0){
    await loadPreviousPage();
    return;
  }

  state.users = users;
}


export default {
  state,
  loadNextPage,
  loadPreviousPage,
  reloadPage,
  getUsers,
  getCurrentPage,
  onUserChanged,
}
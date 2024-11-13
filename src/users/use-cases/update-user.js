

export const updatedUser = async ( user ) => {
  
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
  const resp = await fetch( url , {
    method : "PATCH",
    body : JSON.stringify( user ),
    headers : {
      "Content-Type" : "aplication/json",
    }
  });

  try {

    if( !resp.ok ){
      throw new Error(" Connection Failed ");
    }

    const updatedUser = await resp.json();

    return updatedUser;
    
  } catch (error) {
    console.log("error en", error);
    
  }

};
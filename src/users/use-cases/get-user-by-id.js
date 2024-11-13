/**
 * 
 * @param {String|Number} id 
 */

import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const getUserById = async ( id ) => {
  
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
  try {
    const resp = await fetch( url );

    if (!resp.ok) {
      throw new Error(" conexion no establecida ");
    }
    const data = await resp.json();

    const user =  localhostUserToModel( data );
    return user;

  } catch (error) {
    console.log("error en ", error);
    
  }


};
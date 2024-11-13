/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */

import { localhostUserToModel } from "../mappers/localhost-user.mapper";


export const loadUsersByPage = async ( page = 1 ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
  console.log(url);
  
  const connection = await fetch( url );
  const datos = await connection.json();
  
  if ( datos.last < page || !datos.first || page < 1 ) return []
  
  const { data } = datos;
  
  const transformedUsers = data.map( localhostUserToModel )

  return transformedUsers;
};
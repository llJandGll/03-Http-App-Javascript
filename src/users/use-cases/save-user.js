import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/users'
import { updatedUser } from './update-user';

const createUser = async ( user ) => {
  
  const url = `${import.meta.env.VITE_BASE_URL}/users`;

  const  connect = await fetch( url, {
    method : "POST",
    body : JSON.stringify( user ),
    headers : {
      "Content-Type" : "application/json"
    }

  });

  const newUser = await connect.json();
  console.log({newUser});
  
  return newUser;
};

/**
 * 
 * @param { Like<User>} userLike 
 */
export const saveUser = async  ( userLike ) => {
  
  const user = new User( userLike );

  if ( !user.firstName || !user.lastName ) throw new Error("first & lastname are required");
  
  const userToSave = userModelToLocalhost( user );
  let userUpdated;

  if ( user.id ) {
    userUpdated =  await updatedUser( userToSave );
  }else{
    userUpdated = await createUser( userToSave );
  }
  
  return localhostUserToModel( userUpdated );
  
};




import { User } from "../models/users";

/**
 * 
 * @param {Like<User>} localhostUser transformer
 * @returns {User} return new user transformed
 */
export const localhostUserToModel = ( localhostUser ) => {
  const { avatar, balance, first_name, gender, id, isActive, last_name, } = localhostUser;

  return new User({
    avatar,
    balance,
    firstName: first_name,
    gender,
    id,
    isActive,
    lastName: last_name, 
  });
};
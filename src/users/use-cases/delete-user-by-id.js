export const deleteUserById = async ( id ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users/${id}`;

  const resp = await fetch( url , {
    method: "DELETE",
  });

  const dataDeleteResult = await resp.json();

  console.log("delete-user by id ", dataDeleteResult);

  return true;
};
import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const DeleteFavoriteItem = ( id: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const url = `user-favorite-items/${id}/`;
    APIDelete(url)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteFavoriteItem;

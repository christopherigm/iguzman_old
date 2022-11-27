import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetCartItems from './get-cart-items';

const DeleteCartItem = ( id: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const url = `user-cart-items/${id}/`;
    APIDelete(url)
      .then(() => {
        return GetCartItems();
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteCartItem;

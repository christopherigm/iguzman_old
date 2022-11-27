import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetSellerProducts from './get-seller-products';

export const DeleteProductById = ( itemId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`products/${itemId}/`)
      .then(() => {
        return GetSellerProducts();
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteProductById;

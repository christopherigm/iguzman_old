import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetSellerServices from './get-seller-services';

export const DeleteServiceById = ( itemId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`services/${itemId}/`)
      .then(() => {
        return GetSellerServices();
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteServiceById;

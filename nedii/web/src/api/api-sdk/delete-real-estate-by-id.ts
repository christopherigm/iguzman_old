import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetSellerRealEstates from './get-seller-real-estates';

export const DeleteRealEstateById = ( itemId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`real-estates/${itemId}/`)
      .then(() => {
        return GetSellerRealEstates();
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteRealEstateById;

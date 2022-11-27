import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetSellerVehicles from './get-seller-vehicles';

export const DeleteVehicleById = ( itemId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`vehicles/${itemId}/`)
      .then(() => {
        return GetSellerVehicles();
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteVehicleById;

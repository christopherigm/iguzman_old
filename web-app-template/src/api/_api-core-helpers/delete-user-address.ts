import {
  APIDelete
} from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetUserAddress from './get-user-address';

export const DeleteUserAddress = (addressId: number): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`user-address/${addressId}/`)
      .then(() => {
        return GetUserAddress();
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteUserAddress;

import { APIPatch } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetUserAddress from './get-user-address';
import CheckState from './check-state';
import CheckCity from './check-city';

export const UpdateUserAddress = (address: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data: any = {
      data: {
        id: address.id,
        type: 'UserAddress',
        attributes: address,
        relationships: {
          city: {
            data: {
              type: 'City',
              id: 0
            }
          }
        }
      }
    };
    CheckState(address.state)
      .then((response: any) => {
        return CheckCity(address.city, response.id);
      })
      .then((response: any) => {
        data.data.relationships.city.data.id = response.id;
        APIPatch(`user-address/${address.id}/`, data)
          .then(() => {
            return GetUserAddress();
          })
          .then(() => {
            res(true);
          })
          .catch((error: any) => {
            rej(error);
          });
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateUserAddress;

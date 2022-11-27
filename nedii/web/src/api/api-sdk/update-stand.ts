import { APIPatch } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const UpdateStand = (stand: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data: any = {
      data: {
        id: stand.id,
        type: 'Stand',
        attributes: stand,
        relationships: {}
      }
    };
    if ( stand.phones && stand.phones.length ) {
      data.data.relationships.phones = {
        data: stand.phones
      };
    }
    if ( stand.plan ) {
      data.data.relationships.plan = {
        data: {
          type: 'NediiPlans',
          id: stand.plan
        }
      };
    }
    if ( stand.expo ) {
      data.data.relationships.expo = {
        data: {
          type: 'Expo',
          id: stand.expo
        }
      };
    }
    if ( stand.group ) {
      data.data.relationships.group = {
        data: {
          type: 'Group',
          id: stand.group
        }
      };
    }
    APIPatch(`stands/${stand.id}/`, data)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateStand;

import {
  APIPatch
} from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetUser from './get-user';

interface payload {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

const UpdateUser = ( payload: payload ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data = {
      data: {
        id: user.id,
        type: 'User',
        attributes: payload
      }
    };
    APIPatch(`users/${user.id}/`, data)
      .then(() => {
        return GetUser();
      })
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateUser;

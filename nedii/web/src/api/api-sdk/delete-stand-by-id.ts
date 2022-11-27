import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const DeleteStandById = ( standId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`stands/${standId}/`)
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteStandById;

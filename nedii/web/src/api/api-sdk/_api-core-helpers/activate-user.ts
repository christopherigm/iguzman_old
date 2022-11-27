import { APIPost } from 'src/api/communicator';

const ActivateUser = ( token: string ): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'ActivateUser',
        attributes: {
          token: token
        }
      }
    };
    APIPost( 'activate-user', data )
      .then((d: any) => {
        const response = { ...d };
        res(response);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

export default ActivateUser;

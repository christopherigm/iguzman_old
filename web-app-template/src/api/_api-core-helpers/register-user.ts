import { APIPost } from 'src/api/communicator';
import Login from './login';

interface payloadInterface {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  picture?: string;
}

const RegisterUser = ( payload: payloadInterface ): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'User',
        attributes: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          username: payload.username,
          password: payload.password
        }
      }
    };
    APIPost('users/', data)
      .then(() => {
        return Login({
          email: payload.email,
          password: payload.password
        });
      })
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default RegisterUser;

import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

const GetUserProfile = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const url = `user-profile/?filter[user]=${user.id}`;
    APIGet(url)
      .then((response: any) => {
        const data = response.data[0];
        store.dispatch(SetSystemData({
          profile: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetUserProfile;

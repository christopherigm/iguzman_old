import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetHomeExpos = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('expos/?page[number]=1&page[size]=6&fields[Expo]=name,slug,img_picture')
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          homeExpos: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetHomeExpos;

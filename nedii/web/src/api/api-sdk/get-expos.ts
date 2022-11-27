import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetExpos = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('expos/?fields[Expo]=name,img_picture,slug,real&page[size]=100')
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          expos: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetExpos;

import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetExpoById = (expoId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`expos?filter[slug]=${expoId}&include=groups&fields[Group]=name,img_picture,slug`)
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        const data = RebuildData(response).data[0];
        const exposById = SystemValues.getInstance().system.exposById;
        exposById[expoId] = data;
        store.dispatch(SetSystemData({
          exposById: exposById
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetExpoById;

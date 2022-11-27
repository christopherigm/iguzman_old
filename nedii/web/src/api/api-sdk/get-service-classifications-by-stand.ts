import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetServiceClassificationsByStand = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`services-classifications/?filter[stand]=${standId}`)
      .then((response: any) => {
        const data = response.data;
        const classifications = SystemValues.getInstance().system.serviceClassificationsByStand;
        classifications[standId] = data;
        store.dispatch(SetSystemData({
          serviceClassificationsByStand: classifications
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetServiceClassificationsByStand;

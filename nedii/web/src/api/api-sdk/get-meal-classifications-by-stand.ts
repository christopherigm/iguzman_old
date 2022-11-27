import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetMealsClassificationsByStand = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`meal-classifications/?filter[stand]=${standId}`)
      .then((response: any) => {
        const data = response.data;
        const classifications = SystemValues.getInstance().system.mealsClassificationsByStand;
        classifications[standId] = data;
        store.dispatch(SetSystemData({
          mealsClassificationsByStand: classifications
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetMealsClassificationsByStand;

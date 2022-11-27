import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetMealClassifications = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('meal-classifications/')
      .then((response: any) => {
        const data = response.data;
        store.dispatch(SetSystemData({
          mealClassifications: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetMealClassifications;

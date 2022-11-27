import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetMealBySlug = (mealId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`meals?filter[slug]=${mealId}&include=meal_pictures,meal_addons,classification,stand`)
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        const data = RebuildData(response).data[0];
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetMealBySlug;

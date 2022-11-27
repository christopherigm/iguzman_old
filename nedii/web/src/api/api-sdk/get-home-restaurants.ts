import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetHomeRestaurants = (): Promise<any> => {
  return new Promise((res, rej) => {
    const mealFields = 'name,img_picture,slug,price,final_price,discount,average_rating';
    const standFields = 'name,img_logo,img_cover,slug,highlighted_meals,restaurant,average_rating';
    APIGet(`stands/?page[size]=3&fields[Stand]=${standFields}&include=highlighted_meals&fields[Meal]=${mealFields}&filter[restaurant]=true`)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          homeRestaurants: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetHomeRestaurants;

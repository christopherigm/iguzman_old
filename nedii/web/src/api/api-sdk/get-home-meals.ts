import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

/* eslint-disable no-unused-vars */
enum MealType {
  is_breakfast = 'is_breakfast',
  is_meal = 'is_meal',
  is_dinner = 'is_dinner'
}
/* eslint-enable no-unused-vars */

const GetMeals = (type: MealType): Promise<any> => {
  return new Promise((res, rej) => {
    const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description,is_breakfast,is_meal,is_dinner';
    const url = `meals/?page[size]=12&include=stand&fields[Stand]=name,slug&fields[Meal]=${commonFields}`;
    APIGet(`${url}&filter[${type}]=true`)
      .then((response: any) => {
        const data = RebuildData(response).data;
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const GetHomeMeals = (): Promise<any> => {
  return new Promise((res, rej) => {
    const promises = [];
    promises.push(new Promise((res) => {
      GetMeals(MealType.is_breakfast)
        .then((response: any) => {
          res(response);
        });
    }));
    promises.push(new Promise((res) => {
      GetMeals(MealType.is_meal)
        .then((response: any) => {
          res(response);
        });
    }));
    promises.push(new Promise((res) => {
      GetMeals(MealType.is_dinner)
        .then((response: any) => {
          res(response);
        });
    }));
    Promise.all(promises)
      .then((data: any) => {
        const results: Array<any> = [];
        data.forEach((i: any) => {
          i.forEach((j: any) => {
            results.push(j);
          });
        });
        store.dispatch(SetSystemData({
          homeMealsItems: {
            breakfast: data[0],
            meal: data[1],
            dinner: data[2]
          }
        }));
        res(results);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

export default GetHomeMeals;

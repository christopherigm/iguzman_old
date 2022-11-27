import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetMealsByStandId = (standId: number, filters?: string): Promise<any> => {
  return new Promise((res, rej) => {
    const fields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';
    const url = `meals/?filter[stand]=${standId}&include=classification,meal_addons,stand&fields[Stand]=name,slug&fields[Meal]=${fields}${filters}`;
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetMealsByStandId;

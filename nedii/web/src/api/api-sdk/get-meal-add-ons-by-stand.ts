import { APIGet } from 'src/api/communicator';

export const GetMealAddOnsByStand = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`meal-addons/?filter[stand]=${standId}`)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetMealAddOnsByStand;

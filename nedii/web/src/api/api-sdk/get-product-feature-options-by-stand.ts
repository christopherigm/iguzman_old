import { APIGet } from 'src/api/communicator';

export const GetProductFeatureOptionsByStand = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`product-feature-options/?filter[feature__stand]=${standId}`)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetProductFeatureOptionsByStand;

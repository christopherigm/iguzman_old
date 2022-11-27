import { APIGet } from 'src/api/communicator';

export const GetServiceFeaturesByStand = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`services-features/?filter[stand]=${standId}&page[size]=100`)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetServiceFeaturesByStand;

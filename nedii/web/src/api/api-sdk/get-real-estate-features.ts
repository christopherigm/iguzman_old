import { APIGet } from 'src/api/communicator';

export const GetRealEstateFeatures = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('real-estate-features/?page[size]=100')
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetRealEstateFeatures;

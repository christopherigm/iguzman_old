import { APIGet } from 'src/api/communicator';

export const GetVehicleFeatures = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('vehicle-features/?page[size]=100')
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetVehicleFeatures;

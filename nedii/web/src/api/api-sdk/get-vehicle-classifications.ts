import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetVehicleClassifications = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('vehicle-classifications/?page[size]=100')
      .then((response: any) => {
        const data = response.data;
        store.dispatch(SetSystemData({
          vehicleClassifications: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetVehicleClassifications;

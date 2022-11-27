import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetVehicleBySlug = (vehicle: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`vehicles?filter[slug]=${vehicle}&include=classification,features,stand,features,vehicle_pictures,model,model.make,related`)
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

export default GetVehicleBySlug;

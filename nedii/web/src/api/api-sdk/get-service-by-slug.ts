import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetServiceBySlug = (serviceId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`services?filter[slug]=${serviceId}&include=classification,features,stand,service_pictures,related`)
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

export default GetServiceBySlug;
